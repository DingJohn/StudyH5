# Vue.js 4

## MVVM

- 架构方式、开发思想
- M：Model 数据模型（操作数据的类）
- V：View 视图界面（HTML）
- VM：ViewModel 视图数据模型（驱动视图改变的 data 数据）

## webpack

- [官方网站](https://webpack.js.org)
- 打包工具，JavaScript 模块打包之后就可以运行在浏览器了
- 只能打包 JavaScript 模块，其他资源文件需要使用第三方的 loader 来处理

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
            test: /.(gif|jpg|svg|png)$/,
            use: [
                'image-loader'
            ]
        }
```

# Develoment 开发

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

## transpiling JavaScript

- babel
  - [babel-loader](http://babeljs.io)
  - 只能转换语法，不能转换 API，如需转换 API 还需要使用 babel-polyfill
  - babel 是一个 JavaScript 编译器，可以把EcmaScript 6 编译成 EcmaScript 5
  - babel 可以独立使用，但是独立使用没有意义，一般是和 webpack 结合到一起来使用的
- exclude

### 配置 `babel-loader` 来将 ECMAScript 6 转换为 ECMAScript 5

babel 安装依赖：

```shell
# 下面的包缺一不可
npm install babel-loader babel-core babel-preset-env webpack
```

babel 配置：

```js
// webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/, //不转换 node_modules 中的文件模块
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
  ]
}
```

### 配置 `babel-polyfill` 来提供低版本浏览器中不支持 API 的解决方案

babel-polyfill 安装依赖：

```shell
npm install -D babel-polyfill
```

babel-polyfill 配置：

```javascript
// webpack.config.js
module.exports = {
  entry: ["babel-polyfill", "./app/js"]
};
```

### 配置 `babel-trsanform-runtime` 来解决代码重复的问题

安装依赖：

```shell
npm install --save-dev babel-plugin-transform-runtime
```

```shell
npm install --save babel-runtime
```

配置：

```javascript
// webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/, //不转换 node_modules 中的文件模块
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,// 开启缓存，可以提高打包的速度
          presets: ['env'],
          plugins: ["transform-runtime"]
        }
      }
    }
  ]
}
```

### 配置 `cacheDirectory` 来提高打包的速度

```javascript
// webpack.config.js
use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,// 开启缓存，可以提高打包的速度
      presets: ['env'],
      plugins: ["transform-runtime"]
    }
}
```



## Vue Loader

> 打包 .vue 单文件组件的
>
> [vue 单文件组件官网](https://cn.vuejs.org/v2/guide/single-file-components.html)

安装依赖：

```shell
# vue-loader 依赖 vue-template-compiler ，所以两者缺一不可
npm install -D vue-loader vue-template-compiler
```

配置：

````javascript
// webpack.config.js
{
    test: /\.js$/,
    use: [
       'vue-loader'
    ]
}
````

## externals

> 配置 webpack 不打包第三方包

通常情况下我们不打第三方包，因为第三方包很大，和 bundle 打包在一起会造成资源体积过大，所以还是以 `script` 标签的方式引入，此处以 jQuery 为例：

1. 下载第三方包

   ```shell
   npm install jquery
   ```

2. 在页面中引入资源

   ```html
   <!-- 注意：这里的路径以打包后的 index.html 文件位置为准 -->
   <script src="../node_moudle/jquery/dist/jquery.js"></script>
   ```

3. 配置

   ```javascript
   // webpack.config.js
   externals: {
       // key 是第三方包名，value 是全局中的 jQuery 对象
       // 这里配置的含义是：当在代码中 import jquery 的时候，不会把 jquery 打包到 bundle 中，而是使用指定的全局中的 jQuery 对象
       jquery: 'jQuery'
   }
   ```

4. 加载使用

   ```javascript
   import $ from 'jquery'
   
   $('#app', {
       width: 200,
       height: 200,
       backgroundColor: 'pink'
   })
   ```

5. 打包测试

   ```shell
   npm run build
   ```

# `--save` 和 `--save-dev` 的区别

我们把开发工具相关的依赖信息保存到 `devDependencies`  选项中，把核心依赖（如 vue）的依赖信息保存到 `dependencies` 中，这样就把开发依赖和核心依赖分离了，在发布项目的时候只需要安装 `dependencies` 依赖项中的包：

```shell
npm install --production
```



