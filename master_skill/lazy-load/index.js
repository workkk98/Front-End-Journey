function createArray () {
  let arr = [1, 2, 3];
  createArray = function () {
    return arr;
  }
  return createArray();
}


let arr1 = createArray();
let arr2 = createArray();

console.log(arr1 === arr2)
