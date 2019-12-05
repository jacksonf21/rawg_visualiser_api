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
      // console.log(JSON.stringify(generateGameObject(result.rows), null, 4))
      res.send(generateGameObject(result.rows))
    })
    .catch(error => console.log(error))

})

router.post('/:id', (req, res) => {
  const uid = req.params.id;
  const watchlistName = req.body.watchlistName;

  const Query = {
    text: `
      INSERT INTO watchlists (user_id, name) VALUES ($1, $2)
    `,
    values: [uid, watchlistName]
  }

  pool
    .query(Query)
    .then(res.send('success'))
    .catch(error => console.log(error))

});

module.exports = router;
