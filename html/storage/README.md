# storage

浏览器存储是经常用到的一点，因为需要这个来保存用户的一些信息，存储是在磁盘中没有被销毁。

### storage的最大值

storage都是5M，cookie是4K。
但有没有想过，如何去检测storage的大小呢？首先一个知识点，字符串是2字节

> 4.3.16 String Value

A string value is a member of the type String and is a finite ordered sequence of zero or more 16-bit unsigned integer values.

NOTE Although each value usually represents a single 16-bit unit of UTF-16 text, the language does not place any restrictions or requirements on the values except that they be 16-bit unsigned integers.

### 探测storage的边界

- 我觉得尝试着往存储里加字符串是允许的。这个我们可以用一个二分来试出来这个边界。
- 遍历整个localstorage对象的键值对，因为storage里存的都是string。每个字符是2字节

### 参考

[how-many-bytes-in-a-javascript-string](https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/46735247#46735247)
[how-to-find-the-size-of-localstorage](https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage)