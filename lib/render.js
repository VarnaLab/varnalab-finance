
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
var slugify = require('slugify')
var html = require('html')


module.exports = (data) =>
  render({
    view: view([
      {
        title: 'Средна месечна вноска на всеки спонсор за тази година',
        data: data[0]
      },
      {
        title: 'Среден месечен разход по месеци, групиран по разход',
        data: data[1]
      },
      {
        title: 'Среден месечен разход, групиран по месеци',
        data: data[2]
      },
      {
        title: 'Среден месечен разход до сега',
        data: data[3]
      },
      {
        title: 'Oбщ разход до сега групиран по вид разход',
        data: data[4]
      }
    ])
  })
  .then((rendered) =>
    html.prettyPrint(
      '<!DOCTYPE html>\n' + rendered,
      {indent_size: 2}
    ))

var view = (stats) => () =>
  m('html',
    m('head',
      m('link', {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.2.14/spectre.min.css'
      }),
      m('style', `
        .v-header { background: #607d8b; padding: 5px 0; position: fixed; width: 100%; }
        .v-header .navbar-brand { font-size: 2.5rem; color: #fff; letter-spacing: .4px; }
        .v-content { padding: 70px 0 0 0; }
        .v-content h3 { text-align: center; }
        .v-content table td { padding: 10px; }
        .v-toc ul { font-size: 2rem; }
      `)
    ),
    m('body',
      m('.v-header',
        m('.container grid-960',
          m('.column col-12',
            m('header.navbar',
              m('section',
                m('a.navbar-brand mr-10', 'VarnaLab Финанси и Статистика')
              )
            )
          )
        )
      ),
      m('.container grid-960 v-content',
        m('.column',
          m('.card v-toc',
            m('.card-header',
              m('h3', {id: slugify('Съдържание')},
                m('a', {href: '#' + slugify('Съдържание')}, 'Съдържание')
              )
            ),
            m('.card-body',
              m('blockquote',
                m('ul', stats.map((stat) =>
                  m('li',
                    m('a', {href: '#' + slugify(stat.title)}, stat.title))
                ))
              )
            )
          )
        ),

        // 01
        m('.column',
          m('.card',
            m('.card-header',
              m('h3', {id: slugify(stats[0].title)},
                m('a', {href: '#' + slugify(stats[0].title)}, stats[0].title))
            ),
            m('.card-body',
              m('table.table table-striped table-hover',
                m('thead',
                  m('tr',
                    m('th', 'Спонсор'),
                    m('th', 'Средна месечна вноска до сега за тази година')
                  )
                ),
                m('tbody', stats[0].data.map((sponsor) =>
                  m('tr',
                    m('td', sponsor.name),
                    m('td', m('strong', sponsor.average))
                  )
                ))
              ),
              m('blockquote',
                m('ul',
                  m('li',
                    'общо ',
                    m('strong', Object.keys(stats[0].data).length),
                    ' спонсора за тази година с месечна вноска над 10лв.'
                  )
                )
              )
            )
          )
        ),
        // 02
        m('.column',
          m('.card',
            m('.card-header',
              m('h3', {id: slugify(stats[1].title)},
                m('a', {href: '#' + slugify(stats[1].title)}, stats[1].title))
            ),
            m('.card-body',
              m('table.table table-striped table-hover',
                m('thead',
                  m('tr',
                    m('th', 'Разход'),
                    m('th.text-center', 'Ян'),
                    m('th.text-center', 'Фев'),
                    m('th.text-center', 'Мар'),
                    m('th.text-center', 'Апр'),
                    m('th.text-center', 'Май'),
                    m('th.text-center', 'Юни'),
                    m('th.text-center', 'Юли'),
                    m('th.text-center', 'Авг'),
                    m('th.text-center', 'Сеп'),
                    m('th.text-center', 'Окт'),
                    m('th.text-center', 'Ное'),
                    m('th.text-center', 'Дек')
                  )
                ),
                m('tbody', stats[1].data.map((expense) =>
                  m('tr',
                    m('td', expense.name),
                    expense.average.map((average) =>
                      m('td.text-center', average))
                  )
                ))
              ),
              m('blockquote',
                m('ul',
                  m('li', 'месечната стойност е осреднен месечен разход за даденият месец от всички ',
                    m('strong', 'цели години')),
                  m('li', 'първата година, 2011г., не е включена тъй като не е цяла'),
                  m('li', 'текущата година не е включена тъй като не е цяла'),
                  m('li', 'включени са единствено разходи с минимална сума от 150лв')
                )
              )
            )
          )
        ),
        // 03
        m('.column',
          m('.card',
            m('.card-header',
              m('h3', {id: slugify(stats[2].title)},
                m('a', {href: '#' + slugify(stats[2].title)}, stats[2].title))
            ),
            m('.card-body',
              m('table.table table-striped table-hover',
                m('thead',
                  m('tr',
                    m('th.text-center', 'Ян'),
                    m('th.text-center', 'Фев'),
                    m('th.text-center', 'Мар'),
                    m('th.text-center', 'Апр'),
                    m('th.text-center', 'Май'),
                    m('th.text-center', 'Юни'),
                    m('th.text-center', 'Юли'),
                    m('th.text-center', 'Авг'),
                    m('th.text-center', 'Сеп'),
                    m('th.text-center', 'Окт'),
                    m('th.text-center', 'Ное'),
                    m('th.text-center', 'Дек')
                  )
                ),
                m('tbody',
                  m('tr', stats[2].data.map((month) =>
                    m('td.text-center', month)
                  ))
                )
              ),
              m('blockquote',
                m('ul',
                  m('li', 'месечната стойност е осреднен месечен разход за даденият месец от всички ',
                    m('strong', 'цели години')),
                  m('li', 'първата година, 2011г., не е включена тъй като не е цяла'),
                  m('li', 'текущата година не е включена тъй като не е цяла')
                )
              )
            )
          )
        ),
        // 04
        m('.column',
          m('.card',
            m('.card-header',
              m('h3', {id: slugify(stats[3].title)},
                m('a', {href: '#' + slugify(stats[3].title)}, stats[3].title))
            ),
            m('.card-body',
              m('table.table table-striped table-hover',
                m('thead',
                  m('tr',
                    m('th.text-center', 'Среден месечен разход'),
                    m('th.text-center', 'Брой месеци до сега'),
                    m('th.text-center', 'Общо разходи до сега')
                  )
                ),
                m('tbody',
                  m('tr',
                    m('td.text-center', stats[3].data.average),
                    m('td.text-center', stats[3].data.months),
                    m('td.text-center', stats[3].data.total)
                  )
                )
              ),
              m('blockquote',
                m('ul',
                  m('li', 'стойноста включва всички месеци/години до сега')
                )
              )
            )
          )
        ),
        // 05
        m('.column',
          m('.card',
            m('.card-header',
              m('h3', {id: slugify(stats[4].title)},
                m('a', {href: '#' + slugify(stats[4].title)}, stats[4].title))
            ),
            m('.card-body',
              m('table.table table-striped table-hover',
                m('thead',
                  m('tr',
                    m('th', 'Разход'),
                    m('th.text-center', 'Общо')
                  )
                ),
                m('tbody', stats[4].data.map((expense) =>
                  m('tr',
                    m('td', expense.name),
                    m('td.text-center', expense.total)
                  )
                ))
              ),
              m('blockquote',
                m('ul',
                  m('li', 'стойноста включва всички месеци/години до сега'),
                  m('li', 'включени са единствено разходи с минимална сума от 150лв')
                )
              )
            )
          )
        )
      )
    )
  )
