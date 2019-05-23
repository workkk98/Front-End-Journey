const sIterator = {};
sIterator[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};

console.log(...sIterator);  //1 2 3

