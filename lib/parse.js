
module.exports = (csv) => {
  var result = {income: {}, spend: {}}
  var type = ''

  var rows = csv.split('\n')

  rows.forEach((row) => {
    var cells = row.split(',')
    // skip empty rows
    if (!cells[0]) {
      return
    }
    if (cells[0] === 'Приходи:') {
      type = 'income'
      return
    }
    if (cells[0] === 'Разходи:') {
      type = 'spend'
      return
    }
    if (cells[0] === 'общо:') {
      type = ''
      return
    }
    if (type) {
      result[type][cells.shift()] =
        cells.map((month) => parseInt(month || 0))
    }
  })

  return result
}
