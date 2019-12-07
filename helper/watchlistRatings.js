
const generateGameObject = (data) => {
  const gameData = [];

  data.forEach(game => {
    const ratings = [
      {id: 5, title: 'exceptional', count: game.exc_rating_count, percent: Number(game.exc_percent)},
      {id: 4, title: 'recommended', count: game.rec_rating_count, percent: Number(game.rec_percent)},
      {id: 3, title: 'meh', count: game.meh_rating_count, percent: Number(game.meh_percent)},
      {id: 1, title: 'skip', count: game.skip_rating_count, percent: Number(game.skip_percent)}
    ];

    let tempObj = {
      gameId: game.rawg_id,
      name: game.game_name,
      ratingsCount: game.ratings_count,
      ratings: ratings,
      rating: Number(game.rating)
    }

    gameData.push(tempObj);  
  });

  return gameData;
};

module.exports = { generateGameObject }