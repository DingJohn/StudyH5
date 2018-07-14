# Vue.js 3

## 指令

### 系统内置指令

- v-text

```html
<!-- 以下方法会造成抖屏刷新的效果 -->
<h1>{{ message }}</h1>

<!-- 解决浏览器抖屏刷新 -->
<h1 v-text="message"></h1>
```

- v-cloak

```html
<!-- 此方式也可以解决浏览器抖屏刷新，但是操作比 v-text 繁琐 -->
<style> 
    [v-cloak] {
        display:none;
    }
</style>

<h1 v-cloak>{{ message }}</h1>
```

- v-html

```html
<!-- 此属性可以直接加载html代码 -->
<div v-html="<p>这是一段文字</p>"></div>
```

- v-show
  - 如果需要频繁的操作显示或隐藏，则使用 `v-show`
  - 如果只有一次显示或隐藏，则使用 `v-if`

```html
<!-- 只是条件显示和隐藏但不移除，与 v-if 不同的是 v-if 是条件渲染，要么渲染，要么移除 -->
<h1 v-show="true">ok</h1>
```

- v-pre
  - 一般用于加载文章的时候

```html
<!-- 对文本不做任何操作 -->
<h1 v-pre>{{ this is title }}</h1>

<!--
	输出：
	{{ this is title }}
-->
```

### 自定义指令

> 操作DOM的时候（写的多了就熟了）

在 Vue 中，不要出现直接操作 DOM 的方式。如果要操作某个 DOM ，那就封装一个自定义指令，然后把指令作用到想要操作的  DOM 节点上

- 注册绑定方式

  - 指令的名字
    - 名字中不要加 `v-` 的前缀（只有使用的时候才加）
    - 如果有多个单词，也可以使用驼峰式命名规则
    - 在使用的时候，首先要加 `v-` 前缀，如果是驼峰式命名，则需要全部转换为小写，并用 `-` 拼接起来
  - 全局注册
    - `Vue.directive('指令名称:' {配置参数})`
    - 如果是全局注册，则一定要在实例化 `Vue` 之前注册
    - 在***所有组件中（实例）***都可以使用

  ```javascript
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  })
  ```

  - 局部注册
    - 同构实例选项 `directives` 来注册
    - 指令的名字作为 `directives` 对象的成员
    - 只能在**这个组件中（实例）**使用

```html
<!-- 局部指令 -->
<script>
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
</script>

<!-- 在模板中任何元素上使用新的 v-focus 属性 -->
<input v-focus>
```



- 一个指令定义对象可以提供如下几个钩子函数 (均为可选)： 
  - bind
    - 只调用一次，指定第一次绑定到元素的时候调用，可在此做初始化的操作
  - inserted
    - 只调用一次，在被绑定元素插入父级元素的时候调用，可以得到父元素
  - update
    - 所在组件 `vNode` 更新时调用
  - componentUpdated
    - 指令所在组件的 VNode **及其子 VNode** 全部更新后调用 
  - unbind
    - 只调用一次，指令与元素解绑时调用 
- 钩子函数参数
  - el
    - 作用该指令的 DOM 元素
  - binding
    - value 
      - 指令的绑定值

## 组件

- Vue 的组件思想借鉴于 React
- 目前的三大框架都是使用的组件开发思想

### 组件与组件之间是相互独立的

- 默认情况下，组件与组件之间无法进行跨组件数据访问，父子组件也不行
- 组件就是一组特殊的 Vue 实例，无需实例化，管理自己的 `template`
- 在组件中也可以配置自己的类似于 Vue 实例中的一些选项资源：data、methods、computed
- 思想：组件自己管自己，别人管不着

### 组件的 data 必须是函数

- 组件的 data 必须是函数（手动 new 出来的 Vue 实例还是对象）
- 函数内部返回一个对象

### 使用组件的注意事项

> 组件可以理解为特殊的 Vue 实例，他管理着自己的 `template` 

- 组件的 `template` 有且只有一个根节点
- 组件与组件之间是像个独立的，可以有自己的data、methods、computed
- 组件的 `data` 必须是函数

## 服务端请求通信

- Vue 没有内置任何的 Ajax 请求方法
- 在 Vue 1.0 ，使用 `vue resource` 插件来请求
  - 支持  Promise
- 在 Vue 2.0，使用非常棒的三方库：`axios`
  - 支持　Promise
- 在 H5 时候，浏览器增加了一个发起一步请求的方法，`fetch` (原生支持 Promise )
  - 由于兼容问题，一般只在移动端使用

### axios

> Axios 是基于 Promise 的 HTTP库，可以用在浏览器和 node.js 中

安装：

```shell
npm install axios
```

请求方法别名（在使用别名的时候，`url` 、`method` 、`data` 这些属性都不必在配置中指定）：

- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

## Vue 生命周期

![Vue å®ä¾çå½å¨æ](https://cn.vuejs.org/images/lifecycle.png) 

- beforeCreate
  - 实例化 初始化之后调用，此时还拿不到 el、data等数据
- created
  - 在实例化创建之后，此时可以访问到 data 数据
  - 适用于发请求，修改 data 的操作
  - 此时还没有挂载，访问不到el
- beforeMount
  - 挂载元素前，还没有渲染 DOM 数据
- mounted
  - 挂载渲染已完成，DOM 数据已完成更新
- beforeUpdate
  - 数据更新时调用，DOM 还没有得到更新
- updated
  - 数据更新之后调用，DOM 已得到更新
- activated（动态组件）
  - 组件激活时调用
- deactivated（动态组件）
  - 组件停用时调用
- beforeDestroy
  - 实例销毁之前
- destroyed
  - 实例销毁之后调用，此时实例已被销毁，不在管理模版
-  errorCaptured（钩子级别的错误捕获）（v2.5.+新增）
  - 捕获组件中发生的错误

# Vue-router

> [vue-router的官方文档](https://router.vuejs.org/zh/guide)

直接在 vue 的引入后引入即可使用

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vue-router.js"></script>
```

# 工具

## 使用`json-server` 来模拟数据接口

> 该工具默认启动自带跨域能力，已经在服务端处理了
>
> 真正的场景实在客户端处理跨域的问题（代理服务器）

安装：

```shell
npm install json-server
```

使用：

>  创建一个 `json` 文件

启动接口服务：

```shell
json-server --watch xx.json
```

增删改查：

- GET /list
  - 查询所有
- GET /list/id
  - 查询单个
- POST /list
  - 新增
- DELETE /list/id
  - 根据 id 删除
- PATCH /list/id
  - 根据id修改

## 接口测试（postman）

##  创建临时服务器（`http-server`）

安装：

```shell
npm install http-server
```

查看使用帮助：

```shell
hs -h
```

基本使用：

```shell
# 默认暂用 8080 端口启动一个服务器，直接打开浏览器
hs -o

# 指定占用端口
hs -o -p 3001

# 不启用缓存开启
hs -o -p 3001 -c-1
```

