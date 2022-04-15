import ClassList from './index.js'
import { h } from 'hastscript'
import test from 'tape'

test('init', function (t) {
  const el = h('p.center', 'some stuff')
  const expected = ClassList(el)

  t.equal(expected.length, 1)
  t.equal(expected.item(0), 'center')
  t.ok(expected.contains('center'))
  t.end()
})

test('add', function (t) {
  const el = h('p', 'some stuff')
  const expected = ClassList(el)

  expected.add('highlight')
  t.equal(expected.length, 1)
  t.ok(expected.contains('highlight'))
  t.end()
})

test('remove', function (t) {
  const el = h('p.highlight', 'some stuff')
  const expected = ClassList(el)

  expected.remove('highlight')
  t.equal(expected.length, 0)
  t.notOk(expected.contains('highlight'))
  t.end()
})

test('toggle', function (t) {
  const el = h('p.center', 'some stuff')
  const expected = ClassList(el)

  t.notOk(expected.toggle('center'))
  t.notOk(expected.contains('center'))
  t.equal(expected.length, 0)
  t.ok(expected.toggle('center'))
  t.ok(expected.contains('center'))
  t.equal(expected.length, 1)
  t.end()
})

test('replace', function (t) {
  const el = h('p.center', 'some stuff')
  const expected = ClassList(el)

  expected.replace('center', 'highlight')
  t.notOk(expected.contains('center'))
  t.ok(expected.contains('highlight'))
  t.equal(expected.length, 1)
  t.end()
})

test('toString', function (t) {
  const el = h('p', 'some stuff')
  const expected = ClassList(el)

  expected.add('first')
  expected.add('second')
  t.equal(expected.length, 2)
  t.equal(expected.toString(), 'first second')
  t.end()
})
