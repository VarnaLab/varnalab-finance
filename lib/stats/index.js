
var fs = require('fs')
var path = require('path')


fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .reduce((all, file) => (
    all[path.basename(file, path.extname(file))] =
      require(path.join(__dirname, file)),
    all)
  , exports)
