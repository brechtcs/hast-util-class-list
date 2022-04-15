# hast-util-class-list

forked from [hast-util-class-list](https://github.com/brechtcs/hast-util-class-list)

Simulate the browser's [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) API for [`hast`](https://github.com/syntax-tree/hast) nodes.

## Installation

`npm install @enpitsulin/hast-util-class-list`

## Usage

```js
import ClassList from "@enpitsulin/hast-util-class-list";

const el = {
  type: "element",
  tagName: "div",
  properties: { className: ["one"] },
};
const classList = ClassList(el);

classList.contains("one"); // => true
classList.toggle("one"); // => false
// el: {type: 'element', tagName: 'div', properties: {className: []}}
classList.add("one");
// el: {type: 'element', tagName: 'div', properties: {className: ['one']}}
classList.replace("one", "two");
// el: {type: 'element', tagName: 'div', properties: {className: ['two']}}
classList.remove("two");
// el: {type: 'element', tagName: 'div', properties: {className: []}}
```

and some more API just reference: [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

## Acknowledgements

This module was loosely based on [`class-list`](https://github.com/npm-dom/class-list) by [Raynos](https://github.com/Raynos).

## License

Apache-2.0
