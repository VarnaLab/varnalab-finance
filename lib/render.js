
var m = (() => {
  // https://github.com/lhorie/mithril.js/issues/1279#issuecomment-278561782

  var m

  // Polyfill DOM env for mithril
  global.window = require('mithril/test-utils/browserMock.js')()
  global.document = window.document

  // Require the lib AFTER THE POLYFILL IS UP
  m = require('mithril')

  // Make available globally for client scripts running on the server
  global.m = m

  // Export for normal server usage
  return m
})()

var render = require('mithril-node-render')

var monthly = require('../stats/monthly')


module.exports = (data) => {

  var stats = {
    monthly: monthly(data.income['2017'], 6)
  }

  return render({
    view: () =>
      m('html',
        m('head',
          m('link', {src: 'https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.2.14/spectre.min.css'})
        ),
        m('body',
          m('h1', 'Осреднена месечна вноска на всички спонсори за тази година'),
          m('ul', Object.keys(stats.monthly).map((user) =>
            m('li', m('strong', user), ': ', stats.monthly[user])
          ))
        )
      )
  })
}
