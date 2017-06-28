
// Среден месечен разход до сега (за всички месеци/години)
// Сума на всички разходи до сега

module.exports = (spend, first, current) => {

  var total = result(spend)
  var months = (Object.keys(spend).length * 12) - first - current

  return {
    total,
    months,
    average: Math.floor(total / months)
  }
}

var result = (spend) =>
  Object.keys(spend)
    .map((year) => Object.keys(spend[year]).map((item) => spend[year][item]))
    .reduce((all, year) => (all = all.concat(year), all), [])
    .reduce((total, item) => (
      total += item.reduce((sum, month) => (sum += month, sum), 0),
      total
    ), 0)
