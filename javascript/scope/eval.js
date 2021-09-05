function bar (str, a) {
  // eval就相当于把str这个字符串的代码替换到了eval语句处。
  eval(str);

  console.log(b, a); // 输出eval b a
}

var b = 'b';
bar('var b = "eval b"', 'a');
