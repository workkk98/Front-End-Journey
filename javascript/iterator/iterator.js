var it = makeIterator(['a','b']);

function makeIterator (array) {
    var nextIndex = 0;
    return {
        next: function () {
            return nextIndex < array.length ?
             { value:array[nextIndex++] , done : false } : //tips:注意这里操作符 nextIndex++ 即先使用后自增
             { value: undefined, done: true };
        }
    }
}


console.log(typeof it) ;

console.log(it.next()) ;
console.log(it.next()) ;
console.log(it.next()) ;


