/**
 * 删除排序数组的重复项
 * 入参 数组
 * 返回数组长度
 */

 let arr = [0,1,1,2,2,3,3];

//  function fun1 (arr) {
//     let len = arr.length;
//     for(let i=arr.length-1 ; i>0 ; i-- ) {
//         if(arr[i-1] === arr[i]) {
//             len--;
//             for(let j=i ; j<len ; j++) {
//                 arr[j] = arr[j+1];
//             }
//             delete arr[len];
//         }
//     }
//     return len;
//  }

function point(nums) {
    let postion=0;
    let len =1;
    for(let i = 1;i<nums.length;i++) {
        if(nums[postion] != nums[i]) {
            nums[++postion] = nums[i];
            len++;
        }
    }
    nums = nums.slice(0,postion);
    return len;
}

console.log(point(arr));
console.log(arr);