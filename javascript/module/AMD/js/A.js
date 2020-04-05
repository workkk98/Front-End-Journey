console.log('A.js')
var globalVal = 'triks'
define(['B'], function (B) {
  console.log(B)
  var a = 0;
  function getA () {
    return a;
  }
  function plusA () {
    return ++a;
  }
  return {
    getA: getA,
    plusA: plusA
  }
})

