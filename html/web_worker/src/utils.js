function sum (a,b) {
  return a+b;
}

function objectCreate (proto) {
  function an() {

  }
  an.prototype = proto;
  return new an()
}