let express = require('express')
let db = require('./db')

let router = express.Router()

//学生主页
router.get('/students', function (req, res) {
    db.find(function (err, data) {
        if (err) {
            res.status(500).send('server error')
        }

        res.render('./index.html', {
            students: data
        })

    })
})

//新增学生页面
router.get('/students/new', function (req, res) {
    res.render('./add.html')
})

//提交新增的学生信息
router.post('/students/new', function (req, res) {
    db.add(req.body, function (err) {
        if (err) {
            res.status(500).send('server error')
        }
        res.redirect("/students")
    })
})

//编辑学生信息页面
router.get('/students/edit', function (req, res) {
    let id = req.query.id.replace(/"/g, "")
    db.findById(id, function (err, data) {
        if (err) {
            res.status(500).send('server error')
        }

        res.render('./edit.html', {
            student: data
        })

    })
})

//提交编辑后的学生页面
router.post('/students/edit', function (req, res) {
    let id = req.body.id.replace(/"/g, "")
    db.edit(id, req.body, function (err) {
        if (err) {
            res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

//删除学生页面
router.get('/students/delete', function (req, res) {
    let id = req.query.id.replace(/"/g, "")
    db.delete(id, function (err) {
        if (err) {
            res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})

module.exports = router
