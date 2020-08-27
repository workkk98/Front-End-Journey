// 函数类型

interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 函数的参数名不需要与接口里定义的名字相匹配,函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
