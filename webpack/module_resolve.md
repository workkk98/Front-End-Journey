# module

处理module当然得按照rules来处理不同的引入模块

#### rules
rules是个对象数组
**test**

就如同regexp对象的test方法一样，这个属性对应着 正则表达式的值

**use**
通过这个数组的倒叙方式 对对应的module进行解析处理
use通常是<string []> 或 <object []>，字符串或对象对应相应的loader

当loader很复杂时 我们还可以使用object
```
{
  loader: 'babel-loader',
  options: {cacheDirectory:true,},
  enforce: 'pre' // 或 'post' 代表 强制提到最前或最后
}
```

**include**
```
include: path.resolve(__dirname,'src')
```
这条规则只对这个文件夹下有用

**exclude**
排除某个文件夹

**noParse**
让Webpack 忽略对部分没采用模块化的文件的递归解析和处理， 这样做的好处是能提高构建性能。

支持 正则和函数

```
noParse: /$|jquery/,
// 或函数 content指文件路径
noParse: (content) => {
  return /$|jquery/.test(content)
}

```

#### Resolve 这个词带有解析的意思
webpack内置JavaScript的模块规则，默认会采用 模块化标准 里约定的规则去寻找
但我们也可以根据自己的需要修改默认的规则。

**alias**
resolve.alias 配置项通过别名来将原导入路径映射成一个新的导入路径 以下配置

```
{
  alas: {
    components: './src/components/'
  }
}
```
意思就是说 入口文件引入 import 'components/index.vue' 被替换成 './src/components/index.vue'

**mainFields**

配置不同的第三方模块入口
Webpack 会根据 mainFields的配置去决定优先采用哪份代 码，
默认
```
mainFields: [’ browser ’,’ main ’ ]
```

**extensions**

在导入语句没有携带后缀时，webpack会自动带上后缀去尝试文件是否存在
默认配置
```
extensions: ['.js' , '.json']
```

**modules**

webpack默认只会去node_modules中寻找模块
> 有时我们的项目里会有一些模块被其他模块大量依赖和导入，由于其他模块的位置不定，针对不同的文件都要计算被导入的模块文件的相对路径 ，这个路径 有时会很长 ，就像 import ’.. / .. / .. /components/button ’， 这时可以利用modules配置项优化 。假如那些被大量导入的模块都在 .／src/components 目录下， 则将 modules配置 

```
modules : [’./ src/cornponents ’,' node modules ’］后，可以简单地 通过 ’ button ’ 导入 。
```

**descriptionFiles**

**enforceExtension**

**enforceModuleExtension**