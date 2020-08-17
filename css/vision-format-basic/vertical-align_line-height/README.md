# vertical-align 和 line-height

在开发的过程中，我慢慢发现，inline-block元素慢慢不遵循我记忆深处的底边对其基线这一要点。

这说明，肯定是我的知识掌握的不够，所以重新学习


### 1. vertical-align的百分比根据line-height的实际大小

比如```line-height: 30px```, 那么10%的vertical-align， 就是3px。


### inline-block为什么对齐的是基线

我其实忽视了一点，每个inline元素的初始值都是```vertial-align: baseline```

但问题还有，到底是哪条边对其呢？