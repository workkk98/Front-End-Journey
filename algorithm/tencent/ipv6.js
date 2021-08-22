// 将简化版的ipv6转换成完整的ipv6

function format (ip) {
  let count = ip.split(':').length;

  // 一共8组
  if (count < 8) {
    ip = ip.replace('::', `:${new Array(8 - count + 1).fill('0000').join(':')}:`);
  }

  return ip.split(':').map(segment => {
    while (segment.length < 4) {
      segment = '0' + segment;
    }
    return segment;
  }).join(':');
}

console.log(format('::'));
console.log(format('0::0'));
console.log(format('7abc::00ff:fffc'));
console.log(format('fc:0:0:8976:0:0:0:ff'));
console.log(format('2c0f:9981::'));