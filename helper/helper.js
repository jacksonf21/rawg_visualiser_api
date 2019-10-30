
const thisYear = () => {
  const date = new Date(Date.now());
  return date.getFullYear();
};

module.exports = thisYear;