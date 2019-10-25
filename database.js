require('dotenv').config()

const { Pool } = require('pg');

const database = 
`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: database
});

module.exports = { pool };