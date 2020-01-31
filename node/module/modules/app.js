// 都是不带路径的 所以去node_modules中找文件
var Bar = require('bar')  // 不带路径 文件名格式
var Foo = require('foo')  // 不带路径 目录格式

Bar.prototype = Foo.prototype = {
  sayName: function () {
    console.log(this.name)
  }
}

var bar = new Bar(), foo = new Foo();

bar.sayName()
foo.sayName()