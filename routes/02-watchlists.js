const express = require('express');
const { pool } = require('../database');
const router = express.Router();
const { generateGameObject } = require('../helper/watchlistRatings');

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
  console.log(`success on ${watchlistId}`);
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

})

router.post('/:id', async (req, res) => {
  const uid = req.params.id;
  const watchlistName = req.body.watchlistName;

  const watchlistQuery = {
    text: `
      SELECT * FROM watchlists
      WHERE user_id = $1;
    `,
    values: [uid]
  }

  const insertQuery = {
    text: `
      INSERT INTO watchlists (user_id, name) VALUES ($1, $2)
    `,
    values: [uid, watchlistName]
  }

  try {
    const watchlists = await pool.query(watchlistQuery);

    console.log(watchlists.rows)

  } catch(error) {
    console.log(error)
  }
    
    // await pool
    // .query(query)
    // .then(res.send('success'))
    // .catch(error => console.log(error))
  
});

module.exports = router;
