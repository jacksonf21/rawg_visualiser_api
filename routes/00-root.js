const express = require('express');
const router = express.Router();

const { rawgDataResponse } = require('../helper/helper');
const { rawgAnnualGamesUrl, rawgThisMonthGamesUrl, rawgNextMonthGamesUrl } = require('../rawg-urls/rawg-urls');

router.get('/', (req, res) => {
  rawgDataResponse(res, rawgAnnualGamesUrl);
});

router.get('/this-month', (req, res) => {
  rawgDataResponse(res, rawgThisMonthGamesUrl);
});

router.get('/upcoming-month', (req, res) => {
  rawgDataResponse(res, rawgNextMonthGamesUrl);
});

module.exports = router;