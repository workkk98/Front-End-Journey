class Stack {
    constructor(array) {
        this.stack = array;
        this.tail = array.length-1;
    }
    isEmpty() {
        if(this.stack.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    pop() {
        this.tail--;
        return this.stack.pop();
    }
    push(element) {
        this.tail++;
        this.stack.push(element);
    }
}
var evalRPN = function(tokens) {
    let regexO = /^[\-\+\*\/]$/;
    let regexN = /\d/;
    let numbers = new Stack([]);
    let operation = [];
    for(let i = 0 ; i < tokens.length ; i++) {
        if(regexN.test(tokens[i])) {
            numbers.push(parseInt(tokens[i]))
        }
        //如果是加减乘除运算
        if(regexO.test(tokens[i])) {
            operation.push(tokens[i])
            //栈中有大于等于两个数 意思就是说可以操作
            if(numbers.stack.length >=2) {
                let right = numbers.pop();
                let left = numbers.pop();
                let operator = operation.pop();
                switch(operator) {
                    case '+' : numbers.push(left+right);break;
                    case '-' : numbers.push(left-right);break;
                    case '*' : numbers.push(left*right);break;
                    case '/' : if(left/right >= 0) {
                        numbers.push(Math.floor(left/right))
                    } else {
                        numbers.push(Math.ceil(left/right))
                    };break;
                    default : break;
                }
                
            }
        }
        console.log(numbers.stack);
    }
    while(operation.length > 0) {
        if(numbers.stack.length >=2) {
            let right = parseInt(numbers.pop());
            let left = parseInt(numbers.pop());
            let operator = operation[operation.length-1];
            switch(operator) {
                    case '+' : numbers.push(left+right);break;
                    case '-' : numbers.push(left-right);break;
                    case '*' : numbers.push(left*right);break;
                    case '/' : numbers.push(Math.floor(left/right));break;
                    default : break;
                }
        }
        operation.pop()
    }
    return numbers.stack[numbers.tail];
};