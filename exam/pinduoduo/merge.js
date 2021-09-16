const arr1 = [1, 3, 5, 7];
const arr2 = [2, 4, 6, 8];

function merge (arr1, arr2) {
  let left = 0;
  let right = 0;
  let ans = [];
  while (left <= arr1.length - 1 && right <= arr2.length - 1) {
    if (arr1[left] > arr2[right]) {
      ans.push(arr2[right++]);
    } else {
      ans.push(arr1[left++]);
    }
  }

  if (left < arr1.length) {
    ans = ans.concat(arr1.slice(left)); 
  }
  if (right < arr2.length) {
    ans = ans.concat(arr2.slice(right));
  }

  return ans;
}

console.log(merge(arr1, arr2));