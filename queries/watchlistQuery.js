
const createCategoryQuery = (prefix, tableName, index, data) => {
  const categoryRating = data.ratings[index];
  const categoryCount = `${prefix}_rating_count`;
  const categoryPercent = `${prefix}_percent`;
  
  console.log(categoryRating.count);

  return {
    text: `
      INSERT INTO ${tableName} (${categoryCount}, ${categoryPercent})
      VALUES ($1, $2) RETURNING id
    `,
    values: [categoryRating.count, categoryRating.percent]
  }
};

const createRatingQuery = (exc, rec, meh, skip) => {
  return {
    text: `
      INSERT INTO ratings (exceptional_id, recommended_id, meh_id, skip_id)
      VALUES ($1, $2, $3, $4) RETURNING id
    `,
    values: [exc, rec, meh, skip]
  }
};

const createGameQuery = (rawgId, gameName, rating, ratingsID, ratingCount) => {
  return {
    text: `
      INSERT INTO games (rawg_id, game_name, rating, ratings_id, ratings_count)
      VALUES ($1, $2, $3, $4, $5) RETURNING id
    `,
    values: [rawgId, gameName, rating, ratingsID, ratingCount]
  }
};

const createWatchlistGameQuery = (watchlistId, gameId) => {
  return {
    text: `
      INSERT INTO watchlists_games (watchlist_id, game_id)
      VALUES ($1, $2)
    `,
    values: [watchlistId, gameId]
  }
};

module.exports = { createCategoryQuery, createRatingQuery, createGameQuery, createWatchlistGameQuery }