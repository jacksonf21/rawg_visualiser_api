const axios = require('axios');

const thisYear = () => {
  const date = new Date(Date.now());
  return date.getFullYear();
};

const thisMonth = () => {
  const date = new Date(Date.now());
  return date.getMonth() + 1;
};

const thisMonthDays = () => {
  const month = thisMonth();
  const year = thisYear();

  return new Date(year, month, 0).getDate();
};

const upcomingMonth = () => {
  const date = new Date(Date.now());
  return date.getMonth() + 2;
};

const upcomingMonthDays = () => {
  const month = upcomingMonth()
  const year = thisYear();

  return new Date(year, month, 0).getDate();
};

const rawgDataResponse = (res, url) => {
  axios.get(url)
    .then(resp => {
      const data = dataFilter(resp);
      res.send(data);
    });
}

const dataFilter = (API_DATA) => {
  const results = API_DATA.data.results;

  return results.map(result => {
    return {
      gameId: result.id,
      name: result.name,
      ratingsCount: result.ratings_count,
      ratings: result.ratings,
      rating: result.rating
    };
  });
};

console.log(upcomingMonthDays());

module.exports = { thisYear, thisMonth, upcomingMonth, thisMonthDays, upcomingMonthDays, rawgDataResponse };