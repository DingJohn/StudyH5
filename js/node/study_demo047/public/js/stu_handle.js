//学生数据操作

let fs = require('fs')


/**
 * 读取学生信息
 * @param callback 回调
 */
let read_stu = function (callback) {
    fs.readFile('./db.json', function (err, data) {
            if (err) {
                return callback(err)
            }
            return callback(null, JSON.parse(data.toString()))
        }
    )
}

/**
 * 写入学生信息
 * @param students 新的学生信息
 * @param callback 回调
 */
let write_stu = function (students, callback) {
    fs.writeFile('./db.json', students, function (err) {
        if (err) {
            return callback(err)
        }
        return callback(null)
    })
}

/**
 * 新增学生信息
 * @param student 新增的学生信息对象
 * @param callback 回调
 */
exports.add = function (student, callback) {
    read_stu(function (err, data) {
        if (err) {
            return callback(err)
        }
        let students = data.students
        student.id = students[students.length - 1].id + 1
        students.push(student)
        write_stu(JSON.stringify({students: students}), function (err) {
            return callback(err)
        })
        return callback(null)
    })
}

/**
 * 删除学生信息
 * @param id 要删除的学生id
 * @param callback 回调
 */
exports.delete = function (id, callback) {
    read_stu(function (err, data) {
        if (err) {
            return err
        }

        let students = data.students
        let stu_id = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        students.splice(stu_id, 1)

        write_stu(JSON.stringify({students: students}), function (err) {
            if (err) {
                return callback(err)
            }

            return callback(null)

        })

    })
}

/**
 * 修改学生信息
 * @param student 被修改的学生信息
 * @param callback 回调
 */
exports.edit = function (student, callback) {
    read_stu(function (err, data) {
        if (err) {
            return callback(err)
        }

        let students = data.students
        student.id = parseInt(student.id)
        let stu = students.findIndex(function (item) {
            return item.id === student.id
        })
        students.splice(stu, 1, student)

        write_stu(JSON.stringify({students: students}), function (err) {
            if (err) {
                return callback(err)
            }
            return callback(null)
        })

    })
}

/**
 * 查询所有的学生信息
 * @param callback 回调
 */
exports.query = function (callback) {
    read_stu(function (err, data) {
        if (err) {
            return callback(err)
        }
        return callback(null, data.students)
    })
}

/**
 * 根据id查询学生信息
 * @param id 要查询学生的id
 * @param callback 回调函数
 */
exports.quertById = function (id, callback) {
    read_stu(function (err, data) {
        if (err) {
            return callback(err)
        }

        let student = data.students.find(function (item) {
            return parseInt(id) === item.id
        })

        return callback(null, student)

    })
}