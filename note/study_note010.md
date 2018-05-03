###CSS3盒模型
CSS3中通过box-sizing来指定盒模型，即可指定为content-box、border-box，这样我们计算盒子大小的方式就发生了改变。如：
-   1.box-sizing:content-box：盒子大小为width + padding + border，此为默认值
-    2.box-sizing:border-box：盒子大小为width，也就是padding和border的宽度包含在width中
###盒子阴影
语法格式：
>box-shadow: 水平位置 垂直位置 模糊距离 阴影尺寸 阴影颜色 内/外阴影

|    值    |       描述       | 
|:-------:|:------------- :| 
|   h-shadow  |     必须。水平阴影的位置，允许负值    | 
|   v-shadow  |     必须。垂直阴影的位置，允许负值    | 
|   blur  |     可选。模糊距离    | 
|   spread  |     可选。阴影的尺寸    | 
|   color  |     可选。阴影的颜色，参考CSS颜色值    | 
|   inset  |     可选。将外部阴影(outset)改为内部阴影    | 

PS：默认为外阴影，但是代码中不能写外阴影(outset)，否则阴影将不会显示。
