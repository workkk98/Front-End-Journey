let once = function(fn, interval = 1000) {
  let invokeTime;
  return function() {
    if (invokeTime === void 0) {
      fn.apply(this, arguments);
      invokeTime = Date.now();
    } else {
      if (Date.now() - invokeTime < interval) {
        return;
      } else {
        fn.apply(this, arguments);
        invokeTime = Date.now();
      }
    }
  }
  
}

let i = 0;
let onlyOne = once(function(){
  console.log(++i);
});


onlyOne();
onlyOne();
setTimeout(function () {
  onlyOne()
}, 2000);