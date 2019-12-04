const express = require('express');
const { pool } = require('../database');
const router = express.Router();

router.get('/:id', (req, res) => {
  const uid = req.params.id;
  const query = {
    text: `
      SELECT * FROM USERS 
      JOIN watchlists ON user_id = users.id 
      WHERE u_id = $1;
    `,
    values: [uid]
  }

  pool
    .query(query)
    .then(result => {
      res.send(result.rows)
    })
    .catch(error => console.log(error))
  
});

router.get('/:id/games', (req, res) => {
  const query = {
    text: `
      SELECT * FROM watchlists 
      JOIN watchlists_games ON watchlists.id = watchlist_id
      JOIN games ON game_id = games.id
      WHERE user_id = $1
    `,
    values: [id]
  }

  pool.query(query, (err, results) => {
    if (err) throw new Error
    res.send(results.rows)
  })
})

router.post('/:id', (req, res) => {
  const uid = req.params.id;
  const watchlistName = req.body.watchlistName;

  const idQuery = {
    text: `
      SELECT * FROM users
      WHERE u_id = $1
    `,
    values: [uid]
  }

  pool
    .query(idQuery) 
    .then(result => {
      const id = result.rows[0].id;
      const query = {
        text: `
          INSERT INTO watchlists (user_id, name) VALUES ($1, $2)
        `,
        values: [id, watchlistName]
      }
      pool.query(query)
    .catch(error => console.log(error))
      .then(res.send('success'))
      .catch(error => console.log(error))
    })

});

module.exports = router;
