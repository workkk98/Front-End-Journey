var a1 = [,,,];
var a2 = new Array(3);

console.log('a1', a1, 0 in a1) // a1 [ <3 empty items> ] false
console.log('a2', a2, 0 in a2) // a1 [ <3 empty items> ] false



//稀疏数组
var array = []
array[2] = 3

for(var a in array) 
{
   console.log("index=" + a + ",value=" + array[a]);
}

// 密集数组
var dense = [1,2,3]

for(var a in dense) 
{
   console.log("index=" + a + ",value=" + dense[a]);
}