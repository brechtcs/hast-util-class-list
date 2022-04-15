/**
 * @typedef {import('hast').Element} Element
 */

/**
 * @param {Element} node
 */
export default function classList (node) {
  if (!node.properties?.className) {
    node.properties = { className: [] }
  }
  const tokens = /** @type {string[]} */ (node.properties?.className) || []
  let attribute = tokens.join(' ')
  const classList = {
    add: add,
    remove: remove,
    contains: contains,
    toggle: toggle,
    replace: replace,
    item: item,
    length: tokens.length,
    toString: function () {
      return attribute
    }
  }

  /**
   * @param {string} token
   */
  function add (token) {
    if (tokens.indexOf(token) > -1) return
    tokens.push(token)
    update()
  }

  /**
   * @param {string} token
   */
  function remove (token) {
    const index = tokens.indexOf(token)
    if (index === -1) return
    tokens.splice(index, 1)
    update()
  }

  /**
   * @param {string} token
   */
  function contains (token) {
    return tokens.includes(token)
  }

  /**
   * @param {string} token
   */
  function toggle (token) {
    if (contains(token)) {
      remove(token)
      return false
    } else {
      add(token)
      return true
    }
  }

  /**
   * @param {string} a
   * @param {string} b
   */
  function replace (a, b) {
    const i = tokens.indexOf(a)
    if (i > -1) tokens[i] = b
  }

  /**
   * @param { number} index
   */
  function item (index) {
    return tokens[index] || null
  }

  function update () {
    classList.length = tokens.length
    attribute = tokens.join(' ')
  }

  return classList
}
