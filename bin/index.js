
var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--id [Spreadsheet ID]')
  console.log('--sync [2017]')
  console.log('--parse /path/to/csv/dump/location/')
  console.log('--render /path/to/parsed/finance.json')
  console.log('--out /path/to/output/location/')
  process.exit()
}

if (!argv.id && argv.sync) {
  console.log('Specify --id [Spreadsheet ID]')
  process.exit()
}

if (!argv.sync && !argv.parse && !argv.render) {
  console.log('--[sync|parse|render]')
  process.exit()
}


var fs = require('fs')
var path = require('path')

var sync = require('../lib/sync')(require('../config/purest'))
var parse = require('../lib/parse')()
var render = require('../lib/render')


if (argv.sync) {
  ;(async () => {
    var sheets = await sync.spreadsheet(argv.id)

    // specific year
    if (typeof argv.sync === 'number') {
      sheets = sheets.filter((sheet) => sheet.year === argv.sync)
    }

    var files = await sync.files(argv.id, sheets)

    sheets.forEach((sheet, index) => {
      if (argv.out) {
        fs.writeFileSync(
          path.resolve(process.cwd(), argv.out, sheet.year + '.csv'),
          files[index],
          'utf8'
        )
      }
      else {
        console.log(files[index])
      }
    })
  })()
  .catch((err) => console.error(err))
}

else if (argv.parse) {
  parse.dump(path.resolve(process.cwd(), argv.parse))
    .then((result) => {
      if (argv.out) {
        fs.writeFileSync(
          path.resolve(process.cwd(), argv.out, 'finance.json'),
          JSON.stringify(result, null, 2),
          'utf8'
        )
      }
      else {
        console.log(result)
      }
    })
    .catch((err) => console.error(err))
}

else if (argv.render) {
  var data = require(path.resolve(process.cwd(), argv.render))
  render(data).then((html) => {
    if (argv.out) {
      fs.writeFileSync(
        path.resolve(process.cwd(), argv.out, 'index.html'),
        '<!DOCTYPE html>\n' + html,
        'utf8'
      )
    }
    else {
      console.log('<!DOCTYPE html>\n' + html)
    }
  })
}
