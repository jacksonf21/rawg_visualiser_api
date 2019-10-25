const express = require('express');
const { pool } = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw new Error
    res.send(results.rows);
  })
});

module.exports = router;