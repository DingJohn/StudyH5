let http = require('http')
let server = http.createServer()
server.on('request', function (request, respone) {
    let url = request.url
    respone.setHeader('content-type','text/pain;charset=utf-8')
    if (url === '/'){
        respone.end('这是首页')
    }else {
        respone.end('页面未找到')
    }
})
server.listen('80',function () {
    console.log('服务器连接成功')
})