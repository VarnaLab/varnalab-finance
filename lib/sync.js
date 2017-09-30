
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

  var refresh = (auth) =>
    google
      .query('oauth')
      .post('token')
      .form({
        grant_type: 'refresh_token',
        refresh_token: auth.google.user.refresh,
        client_id: auth.google.app.key,
        client_secret: auth.google.app.secret
      })
      .request()
      .then(([res, body]) => body)

  var files = (id, sheets, auth) => Promise.all(
    sheets.map((sheet) =>
      google
        .get(id + '/export')
        .qs({gid: sheet.gid, format: 'csv'})
        .options({
          agent,
          auth: auth ? {bearer: auth.google.user.token} : null
        })
        .request()
        .then(([res, body]) => body)
  ))

  return {spreadsheet, files, refresh}
}
