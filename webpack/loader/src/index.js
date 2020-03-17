const name = "hello world"
const code = require('./example.md')
import './atom-one-dark.css'

function writeMd(code) {
  const div = document.createElement('div');
  div.innerHTML = code
  document.body.appendChild(div)
}

writeMd(code)

window.addEventListener('load', function () {
  console.log('onload');
})