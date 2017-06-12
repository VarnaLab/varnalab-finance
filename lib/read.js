
var fs = require('fs')
var path = require('path')
var parse = require('./parse')


module.exports = (dpath) => {
  var result = {income: {}, spend: {}}

  var files = fs.readdirSync(dpath)
  files.forEach((file) => {
    if (path.extname(file) === '.csv') {
      var fpath = path.join(dpath, file)

      var csv = fs.readFileSync(fpath, 'utf8')
      var {income, spend} = parse(csv)

      var year = file.replace(/finance-(\d{4})\.csv/, '$1')
      result.income[year] = income
      result.spend[year] = spend
    }
  })

  return result
}
