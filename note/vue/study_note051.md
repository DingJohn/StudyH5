# Vue.js

## 安装

- vue 不支持 IE8 及其以下的版本，因为 Vue 不能模拟 ECMAScript 5 特性

- 安装

  ```shell
  npm install vue
  ```

## Vue 实例

- el：
  - 指定被 Vue 管理的模版入口，网页中的 DOM 节点
  - 不能使用 body、html
  - 必须是一个普通的 html 标签，一般是 div
- data
  - **数据驱动视图** 中的  **数据**
  - 核心是把 DOM 操作的思想转变到 **数据驱动视图** 的思想
- methods：
  - 方法可以写在 data 中，但是 Vue 更推荐写在 methods 中
  - 一般用来定义事件处理函数
  - 不允许有与 data 中相同的成员名，否则会报错

```javascript
new Vue({
    el: ,
    data: ,
    methods:
})
```

## 数据绑定渲染

- 文本绑定：`{{ }}`
  - mastache 语法
  - `{{ }}` 内可以写三元表达式或者简单表达式
- 属性绑定：`v-bind`
  - 在实际开发中可以用 `:` 替代 `v-bind`

数据绑定例子：

```html
<!-- data 中的成员 message -->
<h1>{{ message }}</h1>

<!-- 字符串 message -->
<h1>{{ 'message' }}</h1>

<!-- 数字 123 -->
<p>{{ 123 }}</p>

<!-- 错误的用法 -->
<h1 foo = "{{ message }}">测试文本</h1>

<!-- 绑定 data 中的成员 message，正确的用法，也是响应式的 -->
<h1 v-bind: foo = "message">测试文本</h1>

<!-- 字符串 message -->
<h1 v-bind: foo = "'message'">测试文本</h1>
```

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

bind 其他用法：

```html
<!-- 当 isActive 为 true 的时候，class 属性值为 active，否则为空 -->
<div v-bind:class="{ active: isActive }"></div>
```



## 事件处理

- 定义事件处理函数

- 绑定事件处理函数
  - `v-on: 事件名 = "事件处理函数"`
  - 缩写：`@事件名 = "事件处理函数"`

  ```html
  <!-- 完整语法 -->
  <a v-on:click="doSomething">...</a>
  
  <!-- 缩写 -->
  <a @click="doSomething">...</a>
  ```

  

## 条件渲染与列表循环渲染

- `v-if`

```html
<!-- 判断如果为true，则显示 span 标签，如果为 false 则隐藏 span 标签 -->
<div id="app">
    <span v-if = "true/false"></span>
</div>
```



- `v-for`

```html
<!-- 根据数组元素的个数遍历生成 li 标签并赋值 -->
<ul id = "app">
    <li v-for = "product in products">
    	{{ product }}
    </li>
</ul>

<script>
    const app = new Vue({
        el: '#app',
        data:{
            products:[
                'Boots',
                'Jacket',
                'Hiking Socks'
            ]
        }
    })
</script>

<!-- 
	此处在网页中显示的是一个有三个li的无序列表
     Boots
	Jacket
	Hiking Socks 
-->
```



# ECMAScript 6

## let 和 const

- let
  - 声明变量
  - 不允许重复声明
- const
  - 声明常量，声明同时必须赋值
  - 值不可再更改，如 java 中 `final`
- 两者都是块级作用域
  - const 的效率要比 let 高
  - 推荐都是用 const，遇到报错的再使用let，因为实际开发中，使用常量要比变量多

## 字符串的扩展

- includes

  ```javascript
  //是否包含某个字符串
  'hello world'.includes('o')
  
  //true
  ```

- startsWith

  ```javascript
  //是否以某个字符串开头
  'hello world'.startsWith('h')
  
  //true
  ```

- endsWith

  ```javascript
  //是否以某个字符串结尾
  'hello world'.endsWith('o')
  
  //false
  ```

- repeat

  ```javascript
  //重复某个字符串 n 次
  'hello'.repeat(2)
  
  //hellohellohello
  ```

- 字符串模版

  ```javascript
  //如果字符串既不拼接也不换行，则使用以前的单引号（' '），如果有换行或则拼接，则推荐使用字符串模版，如下
  const stu = {
      name: 'kevin',
      age: 18
  }
  
  console.log(`大家好，我叫${user.name}，
  	我今年${user.age}岁了`)
  //大家好，我叫kevin，
  //我今年18岁了
  ```

  ## 结构赋值

  - 数组结构赋值

  ``` javascript
  //数组结构赋值是按照索引顺序来赋值的，es 6 允许设置默认值
  const phone = ['apple' , 'xiaomi']
  const[str1, str2， str3 = 'keke'] = phone
  console.log(str1, str2 ,str3)
  
  //apple xiaomi keke
  ```

  - 对象结构赋值

  ``` javascript
  //对象结构赋值是按照键值来赋值的
  const user = {
      name: 'kevin',
      age: 18
  }
  const {age, name, gender} = user
  console.log(name, age, gender)
  
  //kevin 18 undefined
  ```

  - 函数参数结构赋值

  ```javascript
  function add ([x, y]) {
      return x + y
  }
  
  add([3, 8])//11
  ```

  ## 函数的扩展

  ### 箭头函数

  - 箭头函数不能用于函数声明，只能用于表达式
  - 箭头函数不能当作构造函数

  ```javascript
  //一条语句可以省略 {}
  //简写
  const sum = (num1 + num2) => num1 + num2
  
  //==============>等同于
  
  //完整写法
  const sum = function (num1 , num2) {
      return num1 + num2
  }
  
  /////////////////////////////////////////////////////////////////////////////////
  
  //一个参数可以省略 ()
  //简写
  const num = num1 => num1
  
  //完整写法
  const num = function (num1) {
      return num1
  }
  ```

  