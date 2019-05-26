//寄生组合

function Father(name) {
    this.role = 'father';
    this.name = name;
}

Father.prototype.grandFather = function () {
    console.log(grandFather);
}

function Child (age) {
    this.age = age;

    //Father.call(this , name);//错误 ，不能初始化时把变量放入到Father类中
    Father.call(this,'bob');
}

function inheritPrototype (Child ,Father) {
    const prototype = Father.prototype;
    prototype.constructor = Child;
    Child.prototype = Father;
}

inheritPrototype(Child , Father);

Child.prototype.sayAge = function () {
    console.log(this.age);
}

const son = new Child(5);

console.log(son);




