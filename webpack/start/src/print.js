class Elem {
  constructor(target) {
    this.elem = document.createElement(target)
  }

  addClass(name) {
    this.elem.classList.add(name)
  }

  getElem () {
    return this.elem
  }
  static printMe () {
    console.log('Updating print.js...')
  }
}


export default Elem;