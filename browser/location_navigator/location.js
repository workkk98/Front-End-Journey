// location

// 1. window.location 和 document.location是同一个对象

console.log(window.location == document.location) 

// 2. location 属性
/**
 * hash 哈希值
 * host 返回服务器名称和端口号(如果有)
 * hostname 不带服务端口号的名称
 * href 完整url
 * port 端口号
 * protocol
 * 例子 http://www.zxf.com/index?name=zxf#hash
 * 协议，服务器名称，请求路径，请求参数，哈希值
 */
console.log("location详情: "+location)

//位置操作
//1.改变窗口位置 常用 location.href, 冷门直接修改location或location.assign()

// location.href = "http://localhost:1818/error"

//也可修改location的其他属性，hostname pathname search hash（除hash外都会刷新) 都会有生成浏览记录

//replace API 顾名思义，不保存原先浏览记录
//location.replace('http://localhost:1818/replace')

//location.reload方法




