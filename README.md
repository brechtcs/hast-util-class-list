# hast-util-class-list

Simulate the browser's [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) API for [`hast`](https://github.com/syntax-tree/hast) nodes.

## Installation

`npm install hast-util-class-list`

## Usage

```js
var ClassList = require('hast-util-class-list')

var el = {type: 'element', tagName: 'div', properties: {className: ['one']}}
var classList = ClassList(el)

classList.contains('one') // => true
classList.toggle('one') // => false
// el: {type: 'element', tagName: 'div', properties: {className: []}}
classList.add('one')
// el: {type: 'element', tagName: 'div', properties: {className: ['one']}}
classList.replace('one', 'two')
// el: {type: 'element', tagName: 'div', properties: {className: ['two']}}
classList.remove('two')
// el: {type: 'element', tagName: 'div', properties: {className: []}}
```

## Acknowledgements

This module was loosely based on [`class-list`](https://github.com/npm-dom/class-list) by [Raynos](https://github.com/Raynos).

## License

Apache-2.0
