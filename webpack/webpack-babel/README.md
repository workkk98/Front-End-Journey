# babel

@babel/core 是babel的核心库

然后babel-loader众所周知 是使用在webpack中的loader角色

#### 命名

我觉得babel这个命名方式 还是很有特点的。  @babal/xxxx

#### webpack打包配置

rules中 加这一条规则即可

```
{
  // 很奇怪这个的作用 为啥要多加个m?
  test: /.m?js$/,
  loader: ['babel-loader']
}
```

#### 插件集合

@babel/preset-env 整合了 然而 这个我并未整明白
```
Using plugins:
transform-template-literals {}
transform-literals {}
transform-function-name {}
transform-arrow-functions {}
transform-block-scoped-functions {}
transform-classes {}
transform-object-super {}
//...
```