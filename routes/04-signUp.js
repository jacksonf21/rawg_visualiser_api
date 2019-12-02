const express = require('express');
const { pool } = require('../database');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  
  const userDetails = req.body.userInformation;
  const query = {
    text: `
      INSERT INTO users (first_name, last_name, email, u_id)
      VALUES ($1, $2, $3, $4)
    `,
    values: userDetails
  }

  console.log(query)

  pool.query(query, (err, results) => {
    console.log(err)
    if (err) throw new Error
    res.send(results.rows);
  })
});


module.exports = router;
