const axios = require('axios');
const express = require('express');
const thisYear = require('../helper/helper');
const router = express.Router();

router.get('/', (req, res) => {
  axios.get(`https://api.rawg.io/api/games?dates=${thisYear()}-01-01,${thisYear()}-12-31&ordering=-added`)
    .then(resp => {
      const data = dataFilter(resp);
      res.send(data);
    });
});

const dataFilter = (API_DATA) => {
  const results = API_DATA.data.results;

  return results.map(result => {
    return {
      name: result.name,
      ratingsCount: result.ratings_count,
      ratings: result.ratings
    };
  });
};

module.exports = router;