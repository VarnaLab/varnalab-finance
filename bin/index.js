
var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--config /path/to/config.json')
  console.log('--sync year')
  console.log('--dump /path/to/location/')
  console.log('--parse /path/to/location/')
  console.log('--render /path/to/location/')
  console.log('--out /path/to/output/location/')
  process.exit()
}

if (!argv.config) {
  console.log('Specify --config /path/to/config.json')
  process.exit()
}

if (!argv.sync && !argv.dump && !argv.parse && !argv.render) {
  console.log('--[sync|dump|parse|render]')
  process.exit()
}


var fs = require('fs')
var path = require('path')

var env = process.env.NODE_ENV || argv.env || 'development'
var config = require(path.resolve(process.cwd(), argv.config))[env]

var sync = require('../lib/sync')(require('../config/purest'))
var parse = require('../lib/parse')()
var render = require('../lib/render')


if (argv.sync) {
  ;(async () => {
    var sheets = await sync.spreadsheet(config.id)

    // specific year
    if (typeof argv.sync === 'number') {
      sheets = sheets.filter((sheet) => sheet.year === argv.sync)
    }

    var files = await sync.files(config.id, sheets)

    sheets.forEach((sheet, index) => {
      fs.writeFileSync(
        path.resolve(process.cwd(), argv.out, sheet.year + '.csv'),
        files[index],
        'utf8'
      )
    })
  })()
  .catch((err) => console.error(err))
}

else if (argv.parse) {
  parse.dump(path.resolve(process.cwd(), argv.parse))
    .then((result) => {
      fs.writeFileSync(
        path.resolve(process.cwd(), argv.out, 'finance.json'),
        JSON.stringify(result, null, 2),
        'utf8'
      )
    })
    .catch((err) => console.error(err))
}

else if (argv.render) {
  var data = require(path.resolve(process.cwd(), argv.render))
  render(data).then((html) => {
    fs.writeFileSync(
      path.resolve(process.cwd(), argv.out, 'index.html'),
      '<!DOCTYPE html>\n' + html,
      'utf8')
    })
}
