namespace check {
  export function checkArray (instance) {
    return instance instanceof Array;
  }
}

import checkArray = check.checkArray;

console.log(checkArray([]));