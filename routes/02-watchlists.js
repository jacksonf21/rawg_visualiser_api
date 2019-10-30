const express = require('express');
const { pool } = require('../database');
const { watchlistSorter } = require('../helper/helper')
const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
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
    res.send(results.rows);
  })
});


module.exports = router;
