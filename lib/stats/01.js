
// Средна месечна вноска на всеки спонсор за тази година

module.exports = (sponsors, period) =>
  Object.keys(sponsors)
    .map((name) => ({
      name,
      monthly: sponsors[name],
      total:
        sponsors[name].reduce((total, month) => (total += month, total), 0),
      average: Math.floor(
        sponsors[name].reduce((total, month) => (total += month, total), 0) /
        period)
    }))
    .filter((sponsor) => (sponsor.average >= 10))
    .sort((a, b) => (b.average - a.average))


// test
if (require.main === module) {
  var data = require('../data.json')
  var result = module.exports(data.income['2017'], 6)
  console.log(result)
}
