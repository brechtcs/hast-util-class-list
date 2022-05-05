/**
 * @typedef {import('hast').Element} Element
 */

/**
 * Classlist
 * @param {Element} node
 */
function ClassList (node) {
  if (!node.properties?.className) {
    node.properties = { className: [] }
  }
  const tokens = /** @type {string[]} */(node.properties.className)
  let attribute = tokens.join(' ')
  const classList = {
    add: add,
    remove: remove,
    contains: contains,
    toggle: toggle,
    replace: replace,
    item: item,
    length: tokens.length,
    forEach,
    entries,
    keys,
    values,
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
   * @param {any} token
   * @param {(() => any) | undefined} force
   */
  function toggle (token, force) {
    if (force !== undefined) {
      force = typeof force === 'function' ? force() : force
      if (contains(token) && !force) {
        remove(token)
      } else if (force) {
        add(token)
      }
    } else {
      if (contains(token)) {
        remove(token)
      } else {
        add(token)
      }
    }
    return contains(token)
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
   * @param {number} index
   */
  function item (index) {
    return tokens[index] || null
  }

  function update () {
    classList.length = tokens.length
    attribute = tokens.join(' ')
  }

  /**
   * @param {(value: string, index: number, array: string[]) => void} callback
   * @param {any} thisArg
   */
  function forEach (callback, thisArg) {
    tokens.forEach(callback, thisArg)
  }

  function entries () {
    return tokens.entries()
  }

  function keys () {
    return tokens.keys()
  }

  function values () {
    return tokens.values()
  }

  return classList
}

export default ClassList
