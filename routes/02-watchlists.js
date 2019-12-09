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
    .then(result => res.send(result.rows))
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

router.post('/add/:watchlistId', async (req, res) => {
  const watchlistId = req.params.watchlistId;
  const gameData = req.body
  const { gameId, name, ratingsCount, rating } = gameData

  console.log(gameData);

  const exceptionalQuery = createCategoryQuery('exc', 'exceptional_ratings', 0, gameData)
  const recommendedQuery = createCategoryQuery('rec', 'recommended_ratings', 1, gameData)
  const mehQuery = createCategoryQuery('meh', 'meh_ratings', 2, gameData)
  const skipQuery = createCategoryQuery('skip', 'skip_ratings', 3, gameData)
  
  
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
    
    const ratingQuery = createRatingQuery(exceptionalId, recommendedId, mehId, skipId)

    const ratings = await pool.query(ratingQuery)
    const ratingId = ratings.rows[0].id  

    console.log(gameId, name, rating, ratingId, ratingsCount)

    const gameQuery = createGameQuery(gameId, name, rating, ratingId, ratingsCount)

    console.log(gameQuery);
    
    const game = await pool.query(gameQuery)
    console.log(game);

    const gameQueryId = game.rows[0].id

    console.log('gameQueryId', gameQueryId)

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
