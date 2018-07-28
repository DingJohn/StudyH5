# CMS

## 第三方包

- moment
  - 时间处理
- blueimp-md5
  - md5 加密
- body-parser
  - 获取 post 参数

## 数据库设计

```sql
CREATE DATABASE IF NOT EXISTS cms;

use cms;

-- 用户表
CREATE TABLE users(
		id INT PRIMARY KEY auto_increment,
		user_name VARCHAR(50) NOT NULL, -- 用户名
		user_pwd VARCHAR(50) NOT NULL, -- 用户密码
		user_mail VARCHAR(50) NOT NULL, -- 用户邮箱
		user_avater VARCHAR(100) NOT NULL, -- 用户头像
		user_gender bit NULL, -- 用户性别
		user_create_time DATE NOT NULL, --创建时间
		user_change_time DATE NULL
);

-- 博文表
CREATE TABLE blog(
		id INT PRIMARY KEY auto_increment,
		blog_title VARCHAR(100) NOT NULL, -- 文章标题
		blog_content TEXT NOT NULL, -- 文章内容
		blog_user_id INT NOT NULL, --作者
		blog_create_time DATETIME NOT NULL, -- 发表日期
		blog_change_time DATETIME NOT NULL -- 发表日期
)

--评论表
CREATE TABLE comments(
		id INT PRIMARY KEY auto_increment,
		cm_content TEXT NOT NULL, -- 评论内容
		cm_create_time DATETIME NOT NULL, -- 评论时间
		cm_blog_id INT NOT NULL, -- 所属博客
		cm_user_id INT NOT NULL, -- 评论人
		cm_reply_uer_id INT NULL -- 回复人
)
```

## 连接数据库

```javascript
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'me',
  password : 'secret',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();
```

## 初始化服务端项目结构

```shell
.
├┈┈ app.js
├┈┈ config.js
├┈┈ controllers
├┈┈ models
├┈┈ node_modules
├┈┈ package.json
├┈┈ package.lock.json
└┈┈ routes
```

## 设计接口（数据接口路由）

> 基于 RESTful 接口设计规范来设计

### 用户资源处理

#### 获取所有用户

请求方法：`GET`

请求路径：`/users`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 添加用户

请求方法：`POST`

请求路径：`/users`

请求体：

- email 邮箱
- password 密码
- nickname 昵称

```json
{
    email:
    password:
    nickname:
}
```

响应结果实例：

```json

```

#### 

#### 修改用户

请求方法：`PATCH`

请求路径：`/users/:id``

请求体：

```json
无
```

响应结果实例：

```json

```

#### 删除用户

请求方法：`DELETE`

请求路径：`/users/:id`

请求体：

```json
无
```

响应结果实例：

```json

```

### 话题资源处理

#### 获取所有话题

请求方法：`GET`

请求路径：`/blogs`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 添加话题

请求方法：`POST`

请求路径：`/blogs`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 修改话题

请求方法：`PEATCH`

请求路径：`/blogs/:id`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 删除话题

请求方法：`DELETE`

请求路径：`/users/:id`

请求体：

```json
无
```

响应结果实例：

```json

```

### 评论资源处理

#### 获取所有评论

请求方法：`GET`

请求路径：`/comments`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 添加评论

请求方法：`POST`

请求路径：`/comments`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 修改评论

请求方法：`PEATCH`

请求路径：`/comments/:id`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 删除评论

请求方法：`DELETE`

请求路径：`/comments/:id`

请求体：

```json
无
```

响应结果实例：

```json

```

### 会话管理

#### 用户登录（创建会话）

请求方法：`POST`

请求路径：`/session`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 用户退出（销毁会话状态）

请求方法：`DELETE`

请求路径：`/session`

请求体：

```json
无
```

响应结果实例：

```json

```

#### 获取登录状态（获取会话状态）

请求方法：`GET`

请求路径：`/session

请求体：

```json
无
```

响应结果实例：

```json

```

# 接口设计规范：RESTful

> 接口的目的就是用于资源操作的（增删改查）
>
> [阮一峰老师的 RESTful 教程](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

## RESTful 结构

- 每一个 `URL` 代表一种资源
- 客户端与服务器端，传递这种资源的某种表现层
- 客户端通过四个 `HTTP` 动词，对服务器资源进行操作，实现 `表现层状态转换`

## 设计误区

- **URL**不应该包含 `动词` ，而应该是 `名词` 的方式，`动词` 应该放在 HTTP 协议中
- **URL** 中包含版本号

## 域名

应该尽量将API部署在专用域名之下

```shell
https://api.example.com
```

如果确定API很简单，不会有进一步扩展，可以考虑放在主域名

```shell
https://example.org/api/
```



## HTTP 动词

```shell
- GET（SELECT）：从服务器取出资源（一项或多项）
- POST（CREATE）：在服务器新建一个资源
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）
- DELETE（DELETE）：从服务器删除资源
- HEAD：获取资源的元数据
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的
```

## 过滤信息

如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果。 

```shell
- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录的开始位置。
- ?page=2&per_page=100：指定第几页，以及每页的记录数。
- ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
- ?animal_type_id=1：指定筛选条件
```

## 状态码

服务器向用户返回的状态码和提示信息，常见的有以下一些（方括号中是该状态码对应的HTTP动词）

```shell
- 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
- 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
- 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - [DELETE]：用户删除数据成功。
- 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
- 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
- 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
- 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
- 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
```

## 错误处理

如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名，出错信息作为键值即可 

```json
{
    error: "Invalid API key"
}
```

## 返回结果

针对不同操作，服务器向用户返回的结果应该符合以下规范

```shell
- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档
```

