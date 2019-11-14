const express = require('express');
const router = express.Router();

const { rawgDataResponse } = require('../helper/helper');

router.get('/collection/:game', (req, res) => {
  const searchedGame = req.params.game;
  const rawgSearchedGameUrl = `https://api.rawg.io/api/games?page_size=3&search=${searchedGame}`;
  rawgDataResponse(res, rawgSearchedGameUrl);
});

router.get('/:game', (req, res) => {
  const searchedGame = req.params.game;
  const rawgSearchedGameUrl = `https://api.rawg.io/api/games?page_size=1&search=${searchedGame}`;
  rawgDataResponse(res, rawgSearchedGameUrl);
});

module.exports = router;