
module.exports = (members, period) => {
  // total
  for (var name in members) {
    members[name] = 
      members[name].reduce((total, month) => (total += month, total), 0)
  }

  // monthly
  for (var name in members) {
    members[name] = Math.floor(members[name] / period)
  }

  // filter
  var filtered = {}
  for (var name in members) {
    if (members[name] >= 10) {
      filtered[name] = members[name]
    }
  }

  // sort
  var sorted = Object.keys(filtered)
    .sort((a, b) => (
      filtered[a] > filtered[b]
      ? -1
      : filtered[a] < filtered[b]
      ? 1
      : 0
    ))
    .reduce((all, name) => (all[name] = filtered[name], all), {})  

  return sorted
}


// test
if (require.main === module) {
  var data = require('../data.json')
  var monthly = module.exports(data.income['2017'], 6)
  console.log(monthly)
}
