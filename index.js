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

  return classList
}

export default ClassList
