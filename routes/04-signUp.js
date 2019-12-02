const express = require('express');
const { pool } = require('../database');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  
  const userDetails = req.body.userInformation;
  const query = {
    text: `
      INSERT INTO users (first_name, last_name, email) 
      VALUES ($1, $2, $3)
    `,
    values: userDetails
  }

  pool.query(query, (err, results) => {
    if (err) throw new Error
    res.send(results.rows);
  })
});


module.exports = router;
