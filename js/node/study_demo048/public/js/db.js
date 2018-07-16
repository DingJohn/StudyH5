const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true//意思是不能为空
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    }
})

//创建一个模型（创建设计表，表名 Cat，有一个String类型的name字段）
const Student = mongoose.model('Student', studentSchema);

/**
 * 新增学生数据
 * @param student 新增的学生对象
 * @param callback 回调
 */
exports.add = function (student, callback) {
    var student = new Student(student)
    student.save(function (err) {
        if (err) {
            return callback(err)
        }
        return callback(null)
    })
}

/**
 * 根据id删除学生信息
 * @param id 学生的id
 * @param callback 回调函数
 */
exports.delete = function (id, callback) {
    Student.findByIdAndRemove(id, function (err) {
        if (err) {
            return callback(err)
        }
        return callback(null)
    })
}

/**
 * 根据学生id修改学生信息
 * @param id 学生的id
 * @param student 新的学生对象
 * @param callback 回调
 */
exports.edit = function (id, student, callback) {
    Student.findByIdAndUpdate(id, student, function (err) {
        if (err) {
            return callback(err)
        }
        return callback(null)
    })
}

/**
 * 查询所有的学生信息
 * @param callback 回调
 */
exports.find = function (callback) {
    Student.find(function (err, ret) {
        if (err) {
            return callback(err)
        }
        return callback(null, ret)
    })
}

/**
 * 根据id查询指定的学生信息
 * @param id 学生id
 * @param callback 回调
 */
exports.findById = function (id, callback) {
    Student.findById(id, function (err, ret) {
        if (err) {
            return callback(err)
        }
        return callback(null, ret)
    })
}