const ab = new ArrayBuffer(12);
const dv = new DataView(ab);

// 我这里操作一下前两个字节。让v3读出来的时候是272 => 大端法 0x0110 在转换成小端法 0x1001

// 所以v1 = 0x10 v2 = 0x01
dv.setUint8(0, 16);
dv.setUint8(1, 1);

// 读两个字节需要指明使用大端法还是小端法（一个字节你还能反序吗，必然是组合起来决定存放顺序才会有这个问题）
// 第二个参数是littleEndian即小端法
const v3 = dv.getUint16(0, true)
console.log(v3); // 272，所以我对了