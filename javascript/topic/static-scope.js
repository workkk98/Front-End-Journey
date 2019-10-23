var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;   //假如注释掉var，情况又是如何
    foo();
}

bar();