const book = {
  title : "Professional Javascript",
  authors: ["Nicholas C. Zakas"],
  edition: 3,
  year: 2011,
  releaseDate: new Date(2020,01,01)
  // toJSON() {
  //   return this.title
  // }
}

// JSON.Stringfy(转换的参数， 过滤器 ， 是否保留缩进(最大值10))
// 如果对象有toJSON() 则优先执行

var bookJSON1 = JSON.stringify(book , ["title" , "authors"] , 4);

var bookJSON2 = JSON.stringify(book , function (key , value) {
  switch(key) {
    case 'title': case 'authors' : return value;  // 略过了这两个值 因为undefined
    case 'edition' : return 5;
    case 'year' : return 2020;
    default : return value;
  }
} , 4)

console.log(bookJSON1)

console.log(bookJSON2)

// 类似于JSON.stringfy 的过滤函数(replacer) 
// JSON.parse(jsonText , reviver)  reviver也就是还原函数


// 这里千万注意 parse到最后一步 (key,value) value会是整个对象 会对整个对象进行还原
const bookCopy = JSON.parse(bookJSON2 , function (key , value) {
  // console.log(key , value)
  switch(key) {
    case "title" : return value;
    case "authors": return value;
    case "edition": return 3;
    case "year": return 2011;
    case "releaseDate": new Date(value);
    default: return value;
  }
})

console.log("通过parse 解析成object" , bookCopy)

