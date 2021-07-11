# 实现一个长图动画

### RAF和setTimeout

使用RAF比setTimeout肉眼可见的顺滑。

具体通过performance分析了下很直观的表现出使用setTimeout API的帧绘制之间的时间更长，这就反映了帧率低的问题。