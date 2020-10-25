function getX (target) {
  if (target === null) {
    return 0;
  }
  console.log(target);
  return target.offsetLeft + getPosition(target.offsetParent);
}

function getY (target) {
  debugger;
  if (target === null) {
    return 0;
  }
  console.log(target);
  return target.offsetTop + getY(target.offsetParent);
}



window.addEventListener('DOMContentLoaded', function (e) {
  var target = document.querySelector('#target');

  console.log(getY(target))
});