let express = require('express')
let fs = require('fs')
let stu_handle = require('./public/js/stu_handle')

let router = express.Router()

// 首页
router.get('/students', function (req, res) {

    stu_handle.query(function (err, data) {
        if (err) {
            return err
        }
        res.render('./index.html', {
            students: data
        })
    })
})

// 新增学生信息
router.get('/students/new', function (req, res) {
    res.render('./new.html')
})

//处理新增学生信息
router.post('/students/new', function (req, res) {
    stu_handle.add(req.body, function (err) {
        if (err) {
            return err
        }
        res.redirect('/students')
    })
})

//编辑学生信息页面
router.get('/students/edit', function (req, res) {
    stu_handle.quertById(req.query.id, function (err, data) {
        if (err) {
            return err
        }

        res.render('./edit.html', {
            student: data
        })

    })
})

//提交编辑后的学生信息
router.post('/students/edit', function (req, res) {
    stu_handle.edit(req.body, function (err) {
        if (err) {
            return err
        }

        res.redirect('/students')

    })
})

//删除学生信息
router.get('/students/delete', function (req, res) {
    stu_handle.delete(req.query.id, function (err) {
        if (err) {
            return err
        }

        res.redirect('/students')

    })
})


// 导出router
module.exports = router