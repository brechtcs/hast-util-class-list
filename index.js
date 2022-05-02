function ClassList (node) {
  if (!node.properties.className) {
    node.properties.className = []
  }
  const tokens = node.properties.className
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

  function add (token) {
    if (tokens.indexOf(token) > -1) return
    tokens.push(token)
    update()
  }

  function remove (token) {
    const index = tokens.indexOf(token)
    if (index === -1) return
    tokens.splice(index, 1)
    update()
  }

  function contains (token) {
    return tokens.includes(token)
  }

  function toggle (token, force) {
    if (force !== undefined) {
      force = typeof force === 'function' ? force() : force
      if (this.contains(token) && !force) {
        this.remove(token)
      } else if (force) {
        this.add(token)
      }
    } else {
      if (this.contains(token)) {
        this.remove(token)
      } else {
        this.add(token)
      }
    }
    return this.contains(token)
  }

  function replace (a, b) {
    const i = tokens.indexOf(a)
    if (i > -1) tokens[i] = b
  }

  function item (index) {
    return tokens[index] || null
  }

  function update () {
    classList.length = tokens.length
    attribute = tokens.join(' ')
  }

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
