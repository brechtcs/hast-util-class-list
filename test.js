var ClassList = require('./')
var hastscript = require('hastscript')
var test = require('tape')

test('init', function (t) {
  var el = h('p.center', 'some stuff')

  t.equal(el.classList.length, 1)
  t.equal(el.classList.item(0), 'center')
  t.ok(el.classList.contains('center'))
  t.end()
})

test('add', function (t) {
  var el = h('p', 'some stuff')

  el.classList.add('highlight')
  t.equal(el.classList.length, 1)
  t.ok(el.properties.className.includes('highlight'))
  t.end()
})

test('remove', function (t) {
  var el = h('p.highlight', 'some stuff')

  el.classList.remove('highlight')
  t.equal(el.classList.length, 0)
  t.notOk(el.properties.className.includes('highlight'))
  t.end()
})

test('toggle', function (t) {
  var el = h('p.center', 'some stuff')

  t.notOk(el.classList.toggle('center'))
  t.notOk(el.properties.className.includes('center'))
  t.equal(el.classList.length, 0)
  t.ok(el.classList.toggle('center'))
  t.ok(el.properties.className.includes('center'))
  t.equal(el.classList.length, 1)
  t.end()
})

test('replace', function (t) {
  var el = h('p.center', 'some stuff')

  el.classList.replace('center', 'highlight')
  t.notOk(el.properties.className.includes('center'))
  t.ok(el.properties.className.includes('highlight'))
  t.equal(el.classList.length, 1)
  t.end()
})

test('toString', function (t) {
  var el = h('p', 'some stuff')

  el.classList.add('first')
  el.classList.add('second')
  t.equal(el.classList.length, 2)
  t.equal(el.classList.toString(), 'first second')
  t.end()
})

/**
 * vdom function with `classList
 */
function h () {
  var el = hastscript.apply(this, arguments)
  el.classList = ClassList(el)
  return el
}
