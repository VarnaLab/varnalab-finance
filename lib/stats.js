
var stats = require('./stats/')


module.exports = [

  // Средна месечна вноска на всеки спонсор за тази година
  (data) => {
    var now = new Date()

    // current year income
    var sponsors = data.income[now.getFullYear()]
    // current month
    var period = now.getMonth() + 1

    return stats[0](sponsors, period)
  },

  // Среден месечен разход по месеци, групиран по разход
  (data) => {
    var now = new Date()

    // all year spendings
    var spend = data.spend
    // not full years
    var notfull = ['2011', String(now.getFullYear())]

    return stats[1](spend, notfull)
  },

  // Среден месечен разход, групиран по месеци
  (data) => {
    var now = new Date()

    // all year spendings
    var spend = data.spend
    // not full years
    var notfull = ['2011', String(now.getFullYear())]

    return stats[2](spend, notfull)
  },

  // Среден месечен разход до сега
  (data) => {
    var now = new Date()

    // all year spendings
    var spend = data.spend
    // months to remove from the first year
    var first = 5
    // months to remove from the current year
    var current = 12 - (now.getMonth() + 1)

    return stats[3](spend, first, current)
  },

  // Oбщ разход до сега групиран по вид разход
  (data) => {
    var now = new Date()

    // all year spendings
    var spend = data.spend
    // not full years
    var notfull = []

    return stats[1](spend, notfull)
  }
]
