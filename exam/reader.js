Array.prototype.getReader = function () {
  let arr = this;
  let index = 0;
  return {
    read (num = 1) {
      if (index > arr.length - 1) {
        return [];
      }
      const part = arr.slice(index, index + num);
      index += num;
      return part;
    }
  }
}

Array.prototype.getReader2 = function () {
  let arr = this;
  function * name (len) {
    let index = 0;
    while (index < arr.length) {
      let end = index + len;
      len = yield arr.slice(index, end);
      index = end;
    }
  }
  let it;
  return {
    read (num = 1) {
      if (!it) {
        it = name(num);
      }

      let { value , done } = it.next(num);
      return done ? [] : value;
    }
  }
}

const arr = [1, 2, 3, 4, 5, 6];
const reader = arr.getReader2();
console.log(reader.read(2));
console.log(reader.read(3));
console.log(reader.read(5));
console.log(reader.read());
console.log(reader.read());
console.log(arr);
