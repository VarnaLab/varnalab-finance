
// Средна месечна вноска на всеки дарител за тази година

module.exports = (backers, period) =>
  Object.keys(backers)
    .map((name) => ({name, monthly: backers[name]}))
    .map(({name, monthly}) => (
      (
        total =
          monthly.reduce((total, month) => (total += month), 0)
      ) =>
      ({
        name,
        monthly,
        total,
        average: Math.floor(total / period)
      })
    )())
    .filter((backer) => (backer.average >= 10))
    .sort((a, b) => (b.average - a.average))
