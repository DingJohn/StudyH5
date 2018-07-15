// 导入express包
let express = require('express')
//导入路由文件
let router = require('./router')
//引入三方获取post参数的包
let bodyParser = require('body-parser')

// 创建服务器
let app = express()
// 导入模版
app.engine('html', require('express-art-template'))

// 设置访问权限
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//挂载路由文件
app.use(router)

// 配置监听
app.listen('80', function () {
    console.log('server runing.....')
})
