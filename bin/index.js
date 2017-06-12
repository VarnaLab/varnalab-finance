
var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--dump /path/to/dump/location/')
  console.log('--render')
  console.log('--save')
  process.exit()
}

if (!argv.dump) {
  console.log('Specify --dump /path/to/dump/location/')
  process.exit()
}

var fs = require('fs')
var path = require('path')
var read = require('../lib/read')
var render = require('../lib/render')


var dpath = path.resolve(process.cwd(), argv.dump)
var data = read(dpath)

if (argv.save) {
  fs.writeFileSync('data.json', JSON.stringify(data), 'utf8')
}

if (argv.render) {
  render(data).then((html) => {
    fs.writeFileSync(
      path.resolve(__dirname, '../index.html'),
      '<!DOCTYPE html>\n' + html,
      'utf8')
    })
}
