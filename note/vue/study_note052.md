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
- 