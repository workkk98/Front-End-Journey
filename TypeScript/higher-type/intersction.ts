interface tiger {
  bar: () => void;
}

interface bird {
  fly: () => void;
}


// 实际上通过类型推论可以判断出返回值的类型，但为了引出交叉类型这个概念，还是声明在这里了。
function createDragon (tiger: tiger, bird: bird): tiger & bird {
  return Object.assign(tiger, bird);
}

