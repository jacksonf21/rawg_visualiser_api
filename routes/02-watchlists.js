const express = require('express');
const { pool } = require('../database');
const router = express.Router();
const { generateGameObject } = require('../helper/watchlistRatings');
const { createCategoryQuery, createRatingQuery, createGameQuery, createWatchlistGameQuery } = require('../queries/watchlistQuery');

router.get('/:id', (req, res) => {
  const uid = req.params.id;
  const query = {
    text: `
      SELECT * FROM watchlists
      WHERE user_id = $1;
    `,
    values: [uid]
  }

  pool
    .query(query)
    .then(result => res.send(result.rows))
    .catch(error => console.log(error))
  
});

router.get('/add/:id', (req, res) => {
  const uid = req.params.id;

  const watchlistQuery = {
    text: `
      SELECT * FROM watchlists 
      JOIN watchlists_games ON watchlists.id = watchlists_games.watchlist_id 
      JOIN games on watchlists_games.game_id = games.id 
      WHERE user_id = $1;
    `,
    values: [uid]
  }

  pool
    .query(watchlistQuery)
    .then(result => {
      res.send(result.rows)
      console.log(result.rows)
    })
    .catch(error => console.log(error))
  
});

router.get('/games/:watchlistId', (req, res) => {
  const watchlistId = req.params.watchlistId
  const query = {
    text: `
      SELECT * FROM watchlists_games 
      JOIN games ON watchlists_games.game_id = games.id
      JOIN ratings ON games.ratings_id = ratings.id
      JOIN exceptional_ratings ON ratings.exceptional_id = exceptional_ratings.id
      JOIN recommended_ratings ON ratings.recommended_id = recommended_ratings.id
      JOIN meh_ratings ON ratings.meh_id = meh_ratings.id
      JOIN skip_ratings ON ratings.skip_id = skip_ratings.id
      WHERE watchlist_id = $1;
    `,
    values: [watchlistId]
  }

  pool
    .query(query)
    .then(result => {
      res.send(generateGameObject(result.rows))
    })
    .catch(error => console.log(error))

});

router.post('/:id', (req, res) => {
  const uid = req.params.id;
  const watchlistName = req.body.watchlistName

  const query = {
    text: `
      INSERT INTO watchlists (user_id, watchlist_name)
      VALUES ($1, $2)
    `,
    values: [uid, watchlistName]
  }

  pool
    .query(query)
    .then(result => res.send(result.rows))
    .catch(error => console.log(error))
  
});

router.post('/add/:watchlistId', async (req, res) => {
  const watchlistId = req.params.watchlistId;
  const gameData = req.body;
  const { gameId, name, ratingsCount, rating } = gameData;

  const exceptionalQuery = createCategoryQuery({
    prefix: 'exc', 
    tableName: 'exceptional_ratings', 
    index: 0, 
    data: gameData
  });

  const recommendedQuery = createCategoryQuery({
    prefix: 'rec', 
    tableName: 'recommended_ratings', 
    index: 1, 
    data: gameData
  });

  const mehQuery = createCategoryQuery({
    prefix: 'meh', 
    tableName: 'meh_ratings', 
    index: 2, 
    data: gameData
  });

  const skipQuery = createCategoryQuery({
    prefix: 'skip', 
    tableName: 'skip_ratings', 
    index: 3, 
    data: gameData
  });
  
  try {
    await pool.query('BEGIN')

    const exceptionalRating = await pool.query(exceptionalQuery)
    const recommendedRating = await pool.query(recommendedQuery)
    const mehRating = await pool.query(mehQuery)
    const skipRating = await pool.query(skipQuery)

    const exceptionalId = exceptionalRating.rows[0].id
    const recommendedId = recommendedRating.rows[0].id
    const mehId = mehRating.rows[0].id
    const skipId = skipRating.rows[0].id
    
    const ratingQuery = createRatingQuery({
      excId: exceptionalId, 
      recId: recommendedId, 
      mehId: mehId, 
      skipId: skipId
    });

    const ratings = await pool.query(ratingQuery)
    const ratingId = ratings.rows[0].id  

    const gameQuery = createGameQuery({
      rawgId: gameId, 
      gameName: name, 
      rating: rating, 
      ratingsId: ratingId, 
      ratingsCount: ratingsCount
    })

    const game = await pool.query(gameQuery)

    const gameQueryId = game.rows[0].id

    const watchlistsGamesQuery = createWatchlistGameQuery(watchlistId, gameQueryId);
    
    await pool.query(watchlistsGamesQuery);
    await pool.query('COMMIT')

    res.send('success');
  
  } catch (e) {
  
    await pool.query('ROLLBACK')
    res.send('fail')
  
  }

});

module.exports = router;
