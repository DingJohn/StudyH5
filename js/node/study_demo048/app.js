let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let Router = require('./public/js/router')

mongoose.connect('mongodb://localhost:27017/student');

let app = express()

app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))

app.use(Router)


app.listen(80, function () {
    console.log('running 80....')
})
