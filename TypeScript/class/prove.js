function Dog () {
  var __this = this; // 记住这个this，这个this在js底层已经是个对象，且__proto__指向函数的prototype
  return __this
}

Dog.prototype.sleep = function () {
  console.log('sleep');
};

var husky = new Dog();

function _new (fun) {
  let a = {};
  Object.setPrototypeOf(a, fun.prototype);
  let b = fun.call(a);
  return b || a;
}