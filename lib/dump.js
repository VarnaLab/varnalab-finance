
var https = require('https')
var request = require('@request/client')
var purest = require('purest')({request, promise: Promise})
var cheerio = require('cheerio')


module.exports = (config) => {

  var agent = new https.Agent({keepAlive: true, maxSockets: 2})
  var google = purest({provider: 'google', config})

  var sheets = ($) =>
    Array.from($('#sheet-menu li'))
      .map((button) => ({
        gid: $(button).attr('id').replace('sheet-button-', ''),
        year: $('a', button).text()
      }))
      .filter((sheet) => Number(sheet.year))
      .map((sheet) => ({gid: sheet.gid, year: parseInt(sheet.year)}))
      .sort((a, b) => b.year - a.year)

  var spreadsheet = (id) =>
    google
      .get(id + '/pub')
      .request()
      .then(([res, body]) => sheets(cheerio.load(body)))

  var files = (id, sheets) => Promise.all(
    sheets.map((sheet) =>
      google
        .get(id + '/export')
        .qs({gid: sheet.gid, format: 'csv'})
        .options({agent})
        .request()
        .then(([res, body]) => body)
  ))

  return {spreadsheet, files}
}
