const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const router = express.Router();

router.get('/', (req, res) => {
  
  res.send('welcome');
});

module.exports = router;