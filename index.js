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

  function toggle (token) {
    if (contains(token)) {
      remove(token)
      return false
    } else {
      add(token)
      return true
    }
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

  function entries () {
    return {
      [Symbol.iterator]: () => {
        let index = 0
        return {
          next: () => {
            if (index < tokens.length) {
              return { value: [index, tokens[index++]], done: false }
            }
            return { done: true }
          }
        }
      }
    }
  }

  function keys () {
    return {
      [Symbol.iterator]: () => {
        let index = 0
        return {
          next: () => {
            if (index < tokens.length) {
              return { value: index++, done: false }
            }
            return { done: true }
          }
        }
      }
    }
  }

  function values () {
    return {
      [Symbol.iterator]: () => {
        let index = 0
        return {
          next: () => {
            if (index < tokens.length) {
              return { value: tokens[index++], done: false }
            }
            return { done: true }
          }
        }
      }
    }
  }

  return classList
}

export default ClassList
