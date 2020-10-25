enum Color { Red = 1, Green, Blue}

let e: Color = Color.Green;
let eIndex: string = Color[1];

console.log(e);
console.log(eIndex);

// enum枚举类型的实质，就是把花括号里的当成string，并从0开始映射string(当让你可以选择)



enum company { apple = 'Apple', tencent = 'Tencent', bbc = 'BBC'}

function getCompanyCountry (companyName: 'apple' | 'tencent') {
  return company[companyName];
}

getCompanyCountry('apple')