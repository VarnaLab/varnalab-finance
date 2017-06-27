
var fs = require('fs')
var path = require('path')
var csv = require('csv-parser')


module.exports = () => {

  var file = (fpath, year) => new Promise((resolve, reject) => {
    var result = {income: {}, spend: {}}
    var type = ''

    fs.createReadStream(fpath)
      .pipe(
        csv({
          headers: ['name', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
        })
      )
      .on('data', (row) => {
        // skip empty rows
        if (!row.name) {
          return
        }
        if (row.name === 'Приходи:') {
          type = 'income'
          return
        }
        if (row.name === 'Разходи:') {
          type = 'spend'
          return
        }
        if (row.name === 'общо:') {
          type = ''
          return
        }
        if (type) {
          result[type][row.name] =
            Object.keys(row)
              .filter((col) => col !== 'name')
              .map((col) => parseInt(row[col] || 0))
        }
      })
      .on('end', () => {
        result.year = year
        resolve(result)
      })
      .on('error', (err) => {
        reject(err)
      })
  })

  var dump = (dpath) => Promise.all(
    fs.readdirSync(dpath).map((fname) =>
      file(
        path.join(dpath, fname),
        path.basename(fname, path.extname(fname))
      )
    ))
    .then((obj) => {
      var result = {income: {}, spend: {}}
      obj.forEach((item) => {
        result.income[item.year] = item.income
        result.spend[item.year] = item.spend
      })

      // fix 2011
      function fix (type) {
        Object.keys(result[type]['2011'])
          .forEach((key) => {
            var item = result[type]['2011'][key]
            item.splice(7, 5)
            result[type]['2011'][key] = [0, 0, 0, 0, 0].concat(item)
          })
      }
      fix('income')
      fix('spend')

      return result
    })

  return {file, dump}
}
