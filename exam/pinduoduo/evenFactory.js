function* evenFactory (array) {
  let index = 0;
  if (Array.isArray(array)) {
    while (index < array.length) {
      if (array[index] % 2 === 0) {
        yield array[index]
      }
      index++;
    }
  } else {
    while (true) {
      yield (++index) * 2;
    }
  }
}

const iterator = evenFactory();
for (let i = 0; i < 4; ++i) {
  console.log(iterator.next());
} 

const iterator2 = evenFactory([2, 4, 7, 9, 10, 13, 14]);

for (let item of iterator2) {
  console.log(item)
}
