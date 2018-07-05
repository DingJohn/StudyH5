# Node js 5

## 关系型数据库和非关系型数据库

### 关系型数据库表与表之间存在关系

- 所有的关系型数据库都需要通过 `sql` 语句来操作
- 所有的关系型数据库在操作之前都需要设计 `表结构`
- 关系型数据库还支持约束，如主键的唯一性等

### 非关系型数据库

- 非关系型数据库非常灵活
- 有的非关系型数据库就是 `key-value` 的形式
- MongoDB就是最像关系型数据库的非关系型数据库
- MongoDB不需要设计表结构

## MongoDB

[mongo参考文档]( http://www.runoob.com/mongodb)

### MongoDB数据库的基本概念

- 可以有多个数据库
- 一个数据库中可以有多个集合（表）
- 一个集合中可以有多个文档（表记录）
- 文档结构灵活，没有任何限制

```json
{
    qq:{
        users:[
            {name: "张三", age: 15},
            {name: "李四", age:17}
        ],
        products:[
            ...
        ]
            ...
    },
    baidu:{
        ...
    },
    taobao:{
        ...
    }
}
```



### 验证MongoDB是否安装成功或者需要查看版本

```shell
#可以查看当前gongodb的版本号
gongod --version
```

### 启动和关闭数据库

启动：

```shell
#gongodb 默认使用执行 mongod 命令所处的盘符根目录下的 /data/db 作为数据存储目录
#所以在第一次执行前需手动添加 /data/db 目录
mongod
```

如需要修改默认的存储路径：

```shell
mongod --dbpath=数据存储路径
```

关闭：

```shell
#在开启服务台直接 Ctrl+C 即可停止
#或者直接关掉控制台也可
```

### 连接和退出数据库

连接：

```shell
#默认链接本机的 MongoDB 服务
#在运行前需开启数据库
mongo
```

退出：

```shell
#在链接数据库状态下输入
exit
```

### 基本命令

- `show dbs`
  - 查看显示所有数据库
  - 默认有 `adnmin` 和 `local` 两个系统级数据库
- `db`
  - 查看当前操作的数据库
- `use 数据库名称`
  - 切换到指定的数据库（如没有会新建），但是只有该数据库有数据之后才会被创建成功
- `db.表名.insertOne({"key": "value"})`
  - 插入一条数据
- `show collections`
  - 查询当前数据库的所有表
- `db.表名.find()`
  - 查询当前表所有的数据

### 在Node中操作MongoDB

#### 使用官方的 `mongodb` 包来操作

> [mongodb 官方包地址](https://www.github.com/mongodb/node-mongodb-native)

#### 使用第三方 `mongoose` 来操作 MongoDB 来操作

- `mongoose` 基于官方的 `MongoDB` 做了再一次封装
  - [mongoose 官方地址](http://www.mongoosejs.com)
  - [mongoose 官方指南](http://www.mongoosejs.com/docs/guide.html)
  - [mongoose 官方API文档](http://www.mongoosejs.com/docs/api.html)

安装：

```shell
#新版本 npm 无需 --save
npm install mongoose
```

使用：

```javascript
//导入包
const mongoose = require('mongoose');
//连接 MongoDB 数据库，此处的数据库不用是存在的
mongoose.connect('mongodb://localhost/test');

const userSchema = new Schema({
    username: {
        type: String,
        required: true//意思是不能为空
    },
    password: {
        type: String,
        required: true
    }
})

//创建一个模型（创建设计表，表名 Cat，有一个String类型的name字段）
const User = mongoose.model('User', userSchema);
```

- 增加数据

  ```javascript
  //实例化一个 Cat
  const admin = new User({ 
  	username: 'java',
      password: '123456'
  });
  
  //持久化保存 kitty 实例
  admin.save(function (err, ret) {
      if (err){
          console.log(err)
      } else {
        	consloe.log('add success')
          console.log(ret)
      }
  })
  ```

- 查询数据

  ```javascript
  //查询所有（可以添加查询条件）
  User.find(function (err, ret) {
      if(err){
          console.log(err)
      } else {
          console.log('query success')
          consoloe.log(ret)
      }
  })
  ```

  ```javascript
  //根据条件查询(只查询一条)，如果没有条件则查询到的是第一条
  User.findOne（{username:'java'}, function(err, ret) {
      if(err){
          console.log(err)
      } else {
       	console.log('query success')
          console.log(ret)
      }
  }）
  ```

- 删除数据

  - 删除所有：

  ```javascript
  //删除所有 username为java的数据
  User.remove({username: 'java'}, function(err, ret) {
      if(err){
          console.log(err)
      } else {
          consoloe.log('remove success')
          consoloe.log(ret)
      }
  })
  ```

  - 根据条件删除一个：

  ```javascript
  User.findOneAndRemove(conditions, [options], callback)
  ```

  - 根据 id 删除：

  ```javascript
  User.findByIdAndRemove(id, [options], callback)
  ```

  

- 更新数据

  - 根据id更新一个：

  ```javascript
  //根据 id 修改密码
  User.findByIdAndUpdate('id value', {password: '95546445'}, function(err, ret){
      if(err) {
          console.log(err)
      } else {
          console.log('update success')
          console.log(ret)
      }
  })
  ```

  - 根据条件更新所有：

  ```javascript
  User.update(conditions, doc, [options], [callback])
  ```

  - 根据指定条件更新一个：

  ```javascript
  User.findOneAndUpdate([conditions], [update], [options], [callback])
  ```

  # 异步编程

  ## Promise

  callback hell:

  ![1530619536510](C:\Users\ADMINI~1\AppData\Local\Temp\1530619536510.png)

为解决回调地狱嵌套，EcmaScript 6 中新增了一个API `Promise`

[参考文档](http://es6.ruanyifeng.com/#docs/promise)



