
// Среден месечен разход до сега, групиран по месеци (за цели години)

module.exports = (spend, notfull) => {
  var items = total(spend, notfull)

  var years = Object.keys(spend)
    .filter((year) => !notfull.includes(year))
    .length

  return result(items, years)
}

var total = (spend, notfull) =>
  Object.keys(spend)
    .filter((year) => !notfull.includes(year))
    .map((year) => Object.keys(spend[year]).map((item) => spend[year][item]))
    .reduce((all, year) => (all = all.concat(year), all), [])

var result = (items, years) => {
  var result = Array(12).fill(0)
  items.forEach((item) => {
    item.forEach((month, index) => {
      result[index] += parseInt(month || 0)
    })
  })
  return result.map((month) => Math.floor(month / years))
}


// test
if (require.main === module) {
  var data = require('../data.json')
  var result = module.exports(data.spend, ['2011', '2017'])
  console.log(result)
}
