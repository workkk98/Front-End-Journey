let fragment = document.createDocumentFragment();
let input1 = document.createElement('input', {
  type: 'text'
});
let input2 = document.createElement('input', {
  type: 'text'
});

function consoleEvent (event) {
  console.log(event)
}


// 捕获backspace，并阻止默认事件
function keydown (event) {

  consoleEvent(event)

  if(event.keyCode === 8) {
    console.log('get')
    event.preventDefault();

    event.target.value = '';
  }
}

input1.addEventListener('keydown', keydown)
input2.addEventListener('keypress', consoleEvent)

fragment.appendChild(document.createTextNode('input1'))
fragment.appendChild(input1);
fragment.appendChild(document.createTextNode('input2'))
fragment.appendChild(input2);

document.body.append(fragment)


