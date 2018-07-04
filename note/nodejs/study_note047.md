# Node.js 4

## npm

### 初始化npm

```shell
#-y表示自动配置package-json文件，无需自己输入
npm init -y
```

### package.json和package-lock.json

- npm 5 以前是没有 `package-lock.json` 文件的，npm 5 以后才有
  - npm 5 以后的安装包毋须 `--save` ，npm会自动保存
- 当安装包的时候，npm都会自动更新或者安装 `pakage-lock.json` 文件
  - `package-lock.json` 文件会保存 `node_modules` 中所有包的信息（版本、下载地址）
- `pakage-lock.json` 文件还有个作用就是锁住引入包的版本，以免意外升级导致其他问题

## node自动重启服务器

### nodemon

这是一个三方的，所以需要单独安装

```shell
#安装nodemon
npm install --global nodemon
```

安装完毕之后，运行：

```shell
#使用nodemon
nodemon index.js
```

当编写代码保存的时候服务器就会自动重启

## express

### 安装express

```shell
#安装express
npm i express
```

### 基本路由

get：

```javascript
//当以GET请求 ‘/’的时候，则进入对应处理函数
app.get('/', function(req, res){
    res.send('Get request')
})
```

post：

```javascript
//当以POST请求‘/’的时候，制定对应的处理函数
app.post('/', function(req. res){
    res.end('POST request')
})
```

### 静态服务

```javascript
//当请求的地址为‘/public’时，访问路径必须是以/public开头才能访问，并且会到public目录查询访问文件
//www.baidu.com/public/index.js
//这种方式更容易辨识，推荐使用此方式
app.use('/public', express.static('./public/'))

//省略第一个参数，则在访问的时候路径必须省略public，否则会报错
//www.baidu.com/index.js
app.use(express.static('./public/'))

//a表示是public的别名，访问路径必须是以/a开头，并且不能加/public，否则不能访问
//www.baidu.com/a/index.js
app.use('/a', express.static('./public/'))
```

## 在Express中配置art-template

+ [art-template 官方文档](https://aui.github.io/art-template/)

+ [art-template-github仓库](https://github.com/aui/art-template/)

  安装：

  ```shell
  npm install --save art-template
  npm install --save express-art-template
  ```

  配置：

  ```javascript
  var express = require('express')
  var app = express()
  //配置art-template
  //第一个参数表示当渲染以‘.art’结尾的文件时(html文件就改成html)，使用art-template模版引擎
  app.engine('art', require('express-art-template'))
  ```

  使用：

  ```javascript
  app.get('/', function(req, res){
      //render方法默认是不可以使用的，必须要配置了模版引擎才能使用
      //第一个参数是html模版名，不能写路径，它会自动去views目录查找该模版文件，所以约定视图文件都放在views文件中
      res.render('index.art', {
          user: {
              name: 'aui',
              tags: ['art', 'express', 'nodejs']
          }
      })
  })
  ```

  如果想要修改默认的视图存储目录`views`，可以：

  ```javascript
  //注意第一个参数views不能写错
  app.set('views', 目录路径)
  ```

  ### express中的重定向

  ```javascript
  //以前的写法:
  //respone.statusCode = 302
  //respone.setHeader('Location', '/')
  respone.redirect('重定向path')
  ```

  ### Express获取表单GET请求的数据

  ```javascript
  //获取到的内容如：[name:'java', language:'english']
  //注意：query只能拿到GET请求的参数
  request.query
  ```

  ### Express中获取表单POST数据

  express没有内置获取表单post请求体的api，需要使用第三方包(`body-parser`)来获取

  安装：

  ```shell
  npm install --save body-parser
  ```

  配置：

  ```javascript
  var express = require('express')
  //引包
  var bodyParser = require('body-parser')
  
  var app = express()
  
  //配置body-parser，加入此配置则会在请求对象上多一个body属性
  //也就是可以直接通过req.body来获取post请求数据了
  app.use(bodyParser.urlencoded({ extended: false }))
  
  app.use(bodyParser.json())
  ```

  使用：

  ```javascript
  app.use(function(req, res) {
      res.setHeader('Content-Type', 'text/plain')
      res.write('you are post: \n')
      res.end(JSON.stringify(req.body, null, 2))
  })
  ```

  ### Express包装路由

  引用：

  ```javascript
  //在路由文件引入express
  var express = require('express')
  ```

  配置：

  ```javascript
  //创建一个路由
  var router = express.Router()
  ```

  使用：

   - 路由文件中

     ```javascript
     //直接使用router
     router.get('/', function(req, res) {
         res.send('use router')
     })
     //在使用结束导出router
     module.exports = router
     ```

  - 服务入口

    ```javascript
    //引入路由文件
    var router = require('./路由文件')
    //最后在服务入口中挂载router
    app.use(router)
    ```

### Express配置使用 `express-session` 操作

> [官方参考文档](https://github.com/expressjs/session)

安装：

```javascript
npm install express-session
```

配置：

```javascript
//该插件为 req 请求对象的一个成员：req.session 默认是一个对象
app.use(session({
    //配置加密字符串，会在原有加密字符串基础上拼接上此字符串再加密，目的是为了更强的安全性
    secret: 'hello kitty',
    resave: false,
    saveUninitialized: false //为 true 表示无论是否使用 session 都会分配一把钥匙，为 false 表示使用时才分配
}))
```

使用：

```javascript
//添加 session 数据
req.session.foo = 'userName'

//获取 session 数据
req.session.foo 
```

**提示：** 默认 session 是内存存储的，服务器一重启就会丢失，真正的生产环境会把 session 进行持久化存储

### Express处理404

express处理 `404页面` 需要使用 `中间件` 来配置，详情在后期会介绍，只需要在路由之后加：

```javascript
app.use(function(req, res) {
    //所有未处理的请求路径都会到此集中处理，包括404
})
```



## CRUD路由设计

| 请求方法 |     请求路径     | get参数 |            post参数            |       备注       |
| :------: | :--------------: | :-----: | :----------------------------: | :--------------: |
|   GET    |    /students     |    /    |               /                |     渲染首页     |
|   GET    |  /students/new   |    /    |               /                | 渲染添加学生页面 |
|   POST   |  /students/new   |    /    |   name、age、gender、hobbies   | 处理添加学生页面 |
|   GET    |  /students/edit  |   id    |               /                |   渲染编辑页面   |
|   POST   |  /students/edit  |    /    | id、name、age、gender、hobbies |   处理编辑请求   |
|   GET    | /students/delete |   id    |               /                |   处理删除请求   |

## 回调函数

​	获取异步操作的结果：

```javascript
function fn(callbck) {
    setTimeout(function() {
        var data = 'hello'
        callback(data)
    }, 1000)
}

fn(function(data) {
    console.log(data)
})
```

## EcmaScript

 - find

    - EcmaScript 6中的语法
    - 会自动遍历调用该方法的数组，并有一个回调函数，还函数有一个参数item就是当前下标的元素

   ```javascript
//返回符合条件的第一个元素 
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9
}) 

// 10
   ```

- finIndex

  - EcmaScript 6语法
  - 专门用来根据条件查找元素的下标

  ```javascript
  //返回符合条件的第一个元素的下表
  [1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9
  }) 
  
  // 2
  ```

  

## 开发步骤

 - 处理模版
 - 配置开放静态资源
 - 配置模版引擎
 - 简单路由，渲染静态页面
 - 路由设计
 - 提取路由模块
 - 封装业务处理js