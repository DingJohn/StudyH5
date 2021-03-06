# Vue.js 1

## Vue.js 介绍

- vue 是一种前端框架
- 它能帮助提升网站应用程序开发效率
- 使用情况
  - 开发 SPA 的时候
  - 可以和传统网站开发框架结合使用，把它当作jQuery
- 作者
  - 尤雨溪
- 发展历史
  - 2013年12月8日正式在github上发布0.6版
  - 2015年10月份发布1.0版本
    - Vue 也是在1.0版本之后开始渐露头角
  - 2016年10月份发布2.0版本

## 起步

安装：

```shell
# 安装 vue.js 命令，默认安装最新版本
npm install vue
```

总结：

- 在页面中具有被 vue 管理的入口（不能是 html、body ）
- `new Vue` 出新的 Vue 应用程序
- 把页面所有需要操作的 DOM ，都通过数据绑定的方式来处理
  - 在 data 中声明
  - 在模版中通过特殊语法来使用
    - `{{}}`使用在非表单元素中，如 h1、p、strong 等
    - `v-model = “”` 使用在表单元素
  - 处理事件的方法
    - 在 `methods` 中定义方法
    - 在模版中通过  `v-on: 事件名 = "事件处理函数名"` 的方式来绑定特定的事件处理函数
  - 通过 `el` 选项来声明被 Vue 管理的模版入口
    - 不能是 html、body
    - 必须是普通的元素节点
- 而且在 Vue 中，通过模版绑定的数据都是响应式的
  - 如果数据一旦发生变化，则绑定改元素的视图元素也会得到改变