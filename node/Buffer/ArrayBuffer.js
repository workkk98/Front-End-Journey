const ab = new ArrayBuffer(12);

console.log(ab.byteLength); // 12
console.log(ab.slice(0, 4).byteLength); // 4