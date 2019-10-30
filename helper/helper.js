
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

console.log(upcomingMonthDays());

module.exports = { thisYear, thisMonth, upcomingMonth, thisMonthDays, upcomingMonthDays };