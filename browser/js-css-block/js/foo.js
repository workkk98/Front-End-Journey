
//foo.js
window.onload = function () {
  console.log('load');
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('contentload');
})

let div1 = document.getElementsByTagName('div')[0]
div1.innerText = 'time.geekbang'