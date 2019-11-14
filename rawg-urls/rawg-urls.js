const { thisYear, thisMonthDays, upcomingMonthDays, thisMonth, upcomingMonth } = require('../helper/helper');

const rawgAnnualGamesUrl = `https://api.rawg.io/api/games?dates=${thisYear()}-01-01,${thisYear()}-12-31&ordering=-added`;

const rawgThisMonthGamesUrl = `https://api.rawg.io/api/games?dates=${thisYear()}-${thisMonth()}-01,${thisYear()}-${thisMonth()}-${thisMonthDays()}&ordering=-added`; 

const rawgNextMonthGamesUrl = `https://api.rawg.io/api/games?dates=${thisYear()}-${upcomingMonth()}-01,${thisYear()}-${upcomingMonth()}-${upcomingMonthDays()}&ordering=-added`;

module.exports = { rawgAnnualGamesUrl, rawgThisMonthGamesUrl, rawgNextMonthGamesUrl }