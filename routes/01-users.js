const express = require('express');
const { pool } = require('../database');
const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [id]
  } 

  pool.query(query, (err, results) => {
    if (err) throw new Error
    res.send(results.rows);
  })
});

module.exports = router;