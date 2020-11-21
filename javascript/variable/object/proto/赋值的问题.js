// 简单来说就是 对 对象某个属性进行赋值操作 就只会修改自身属性，添加或修改。

function Parent(name) {
  this.name = name;
  this.ages = [45]
}

function Child() {
}

Child.prototype = new Parent('Parent');

var child1 = new Child()
var child2 = new Child()

child1.name = 'child'

console.log(child1.name) // Child 修改的是自身属性
console.log(child2.name) // Parent

// 的确 原型上的属性只能访问用，但引用类型就有点特殊了

child1.ages[0] = 44 // 我们去修改了引用类型的内容，而并非修改对象本身 因此这个是可以的

console.log(child1.ages)
console.log(child2.ages)

