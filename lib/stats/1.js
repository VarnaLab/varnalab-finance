
// Статистика за разходи групирани по вид разход (за цели години)

// Сумарен месечен разход по месеци през всички цели години
// Среден месечен разход по месеци през всички цели години
// Сумарен разход за всички години (>= 100лв)


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
    .map((year) => spend[year])
    .reduce((unique, year) => {

      Object.keys(year).forEach((item) => {
        unique[item] = (unique[item] || Array(12).fill(0))
        unique[item] = year[item]
          .map((value, index) => (parseInt(value) + unique[item][index]) || 0)
      })
      return unique
    }, {})

var result = (items, years) =>
  Object.keys(items)
    .map((name) => ({
      name,
      monthly: items[name],
      average: items[name].map((month) => Math.floor(month / years)),
      total: items[name].reduce((total, month) => (total += month, total), 0)
    }))
    .sort((a, b) => a.total > b.total ? -1 : a.total < b.total ? 1 : 0)
    .filter((item) => item.total >= 100)
