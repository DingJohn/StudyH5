# Vue.js 4

## MVVM

- 架构方式、开发思想
- M：Model 数据模型（操作数据的类）
- V：View 视图界面（HTML）
- VM：ViewModel 视图数据模型（驱动视图改变的 data 数据）

## webpack

- [官方网站](https://webpack.js.org)
- 打包工具，JavaScript 模块打包之后就可以运行在浏览器了

安装：

```shell
# 全局安装也会导致在低版本上有兼容问题，推荐安装到开发依赖
npm install --save-dev webpack
```

打包：

```shell
# 全局打包
webpack 文件入口路径 文件出口路径

# 依赖打包（对于安装到项目中的 webpack 需要配置 npm scripts 来使用）
npm	run 属性名
```

### webpack 配置文件（webpack.config.js)

```js
// 此文件最终在 node 环境下执行
const path = require('path')

// 导出一个具有特殊属性配置的对象
module.exports = {
    entry: './src/main.js',//入口文件模块
    output: {
        path: path.join(__dirname, './dist/'),//吃口文件所在模块，path 必须是一个绝对路径
        filename: 'bundle.js' //打包的结果文件名
    }
}
```

### 自动将 html 打包到 bundle.js 所属目录中

安装依赖：

```she
npm install -D html-webpack-plugin
```

配置：

```js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

// 导出一个具有特殊属性配置的对象
module.exports = {
    entry: './src/main.js',//入口文件模块
    output: {
        path: path.join(__dirname, './dist/'),//吃口文件所在模块，path 必须是一个绝对路径
        filename: 'bundle.js' //打包的结果文件名
    },
    plugins: [
        //该插件的作用就是把 index.html 打包到 bundle.js 所属目录
        //会自动在 index.html 中引入 script
        new htmlWebpackPlugin({
            template: 'index.html'
        })    
    ]
}
```



### Loading CSS

安装依赖：

```shell
# css-loader 的作用是把 CSS 文件转换为 JS 模块
# style-loader 的作用是动态创建 style 节点插入到 head 中
npm install --save-dev style-loader css-loader
```

配置（webpack.config.js)：

```js
const path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    moudle: {
        rules: {
            test: /.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    }
}
```

### Loading Image

配置：

```js

    moudle: {
        rules: {
            test: /.gif|jpg|svg|png$/,
            use: [
                'image-loader'
            ]
        }
```

# Develoment 开发

## Source maps



##  webpack-dev-server

- 完成自动打包并刷新浏览器

安装依赖：

```shell
npm i -D webpack-dev-server
```

配置（```webpack.config.js```)：

```js
devServer: {
    //配置 webpack-dev-server 的 www 目录
    contentBase: './dist'
}
```

配置（```package.json```）：

```js
"script": {
    "build": "webpack",
    "watch-build": "webpack --watch",// 修改完成自动打包
    "dev": "webpack-dev-server --open"// 修改完成自动打包并刷新浏览器
}
```

启动开发模式：

```shell
npm run dev
```



## ESLint 代码规范校验





