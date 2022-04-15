/**
 * @typedef {import('hast').Element} Element
 */

/**
 * @class
 */
export class HastTokenList {
  /**
   * @param {Element} element
   */
  constructor (element) {
    if (!element.properties?.className) {
      element.properties = { className: [] }
    }
    /** @type {string[]} */
    this.classList = /** @type {string[]} */ (element.properties?.className)
    /** @type {number} */
    this.length = this.classList.length
  }

  /**
   * @param {number} index
   */
  item (index) {
    return this.classList[index] || null
  }

  /**
   * @param {string} token
   * @returns {boolean}
   */
  contains (token) {
    return this.classList.includes(token)
  }

  /**
   * @param {string[]} tokens
   */
  add (...tokens) {
    tokens.forEach((token) => {
      if (this.classList.indexOf(token) > -1) return
      this.classList.push(token)
      this.update()
    })
  }

  /**
   * @param {string[]} tokens
   */
  remove (...tokens) {
    tokens.forEach((token) => {
      const index = this.classList.indexOf(token)
      if (index === -1) return
      this.classList.splice(index, 1)
      this.update()
    })
  }

  /**
   * @param {string} oldToken
   * @param {string} newToken
   */
  replace (oldToken, newToken) {
    const i = this.classList.indexOf(oldToken)
    if (i > -1) this.classList[i] = newToken
  }

  // TODO
  supports () {
    console.log('todo')
  }

  /**
   * @param {string} token
   * @param {boolean|(()=>boolean)} [force]
   */
  toggle (token, force) {
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

  entries () {
    return {
      [Symbol.iterator]: () => {
        let index = 0
        return {
          next: () => {
            if (index < this.classList.length) {
              return { value: [index, this.classList[index++]], done: false }
            }
            return { done: true }
          }
        }
      }
    }
  }

  keys () {
    return {
      [Symbol.iterator]: () => {
        let index = 0
        return {
          next: () => {
            if (index < this.classList.length) {
              return { value: index++, done: false }
            }
            return { done: true }
          }
        }
      }
    }
  }

  values () {
    return {
      [Symbol.iterator]: () => {
        let index = 0
        return {
          next: () => {
            if (index < this.classList.length) {
              return { value: this.classList[index++], done: false }
            }
            return { done: true }
          }
        }
      }
    }
  }

  update () {
    this.length = this.classList.length
  }

  toString () {
    return this.classList.join(' ')
  }
}

/**
 * @param {Element} node
 */
export default (node) => {
  return new HastTokenList(node)
}
