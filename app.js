const express = require('express');
const { pool } = require('./database');

const app = express()

// app.use(cors())

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw new Error
    console.log(results.rows);
  })
};

getUsers();

