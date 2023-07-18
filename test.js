import ClassList from './index.js'
import { h as hastscript } from 'hastscript'
import test from 'tape'

test('init', function (t) {
  const el = h('p.center', 'some stuff')

  t.equal(el.classList.length, 1)
  t.equal(el.classList.item(0), 'center')
  t.equal(el.classList.item(-1), null)
  t.ok(el.classList.contains('center'))
  t.end()
})

test('add', function (t) {
  const el = h('p', 'some stuff')

  el.classList.add('highlight')
  t.equal(el.classList.length, 1)
  t.ok(el.properties.className.includes('highlight'))
  t.end()
})

test('remove', function (t) {
  const el = h('p.highlight', 'some stuff')

  el.classList.remove('highlight')
  t.equal(el.classList.length, 0)
  t.notOk(el.properties.className.includes('highlight'))
  t.end()
})

test('remove classname doesn\'t exist', function (t) {
  const el = h('p.highlight', 'some stuff')

  el.classList.remove('no-class')
  t.equal(el.classList.length, 1)
  t.ok(el.properties.className.includes('highlight'))
  t.end()
})

test('toggle', function (t) {
  const el = h('p.center', 'some stuff')

  t.notOk(el.classList.toggle('center'))
  t.notOk(el.properties.className.includes('center'))
  t.equal(el.classList.length, 0)
  t.ok(el.classList.toggle('center'))
  t.ok(el.properties.className.includes('center'))
  t.equal(el.classList.length, 1)
  t.end()
})

test('toggle witch force', (t) => {
  const el = h('p.center', 'some stuff')

  t.ok(el.classList.toggle('center', true))
  t.ok(el.classList.contains('center'))
  t.notOk(el.classList.toggle('center', false))
  t.notOk(el.classList.contains('center'))

  t.ok(el.classList.toggle('center', () => true))
  t.ok(el.classList.contains('center'))
  t.notOk(el.classList.toggle('center', () => false))
  t.notOk(el.classList.contains('center'))

  t.equal(el.classList.length, 0)

  t.end()
})

test('replace', function (t) {
  const el = h('p.center', 'some stuff')

  el.classList.replace('center', 'highlight')
  t.notOk(el.properties.className.includes('center'))
  t.ok(el.properties.className.includes('highlight'))
  t.equal(el.classList.length, 1)
  t.end()
})

test('toString', function (t) {
  const el = h('p', 'some stuff')

  el.classList.add('first')
  el.classList.add('second')
  t.equal(el.classList.length, 2)
  t.equal(el.classList.toString(), 'first second')
  t.end()
})

test('entries', (t) => {
  const el = h('p.center.top', 'some stuff')

  t.notStrictEqual(
    [...el.classList.entries()],
    [
      [0, 'center'],
      [1, 'top']
    ]
  )
  t.end()
})

test('keys', (t) => {
  const el = h('p.center.top', 'some stuff')

  t.notStrictEqual([...el.classList.keys()], [0, 1])
  t.end()
})

test('values', (t) => {
  const el = h('p.center.top', 'some stuff')

  t.notStrictEqual([...el.classList.values()], ['center', 'top'])
  t.end()
})

test('forEach', (t) => {
  const el = h('p.a.b.c', 'some stuff')

  el.classList.forEach((value, key) => {
    t.equal(el.classList.item(key), value)
  })
  t.end()
})

/**
 * vdom function with `classList
 */
function h () {
  const el = hastscript.apply(this, arguments)
  el.classList = ClassList(el)
  return el
}
