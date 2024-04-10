const User = require('../models/user')
const Admin = require('../models/admin')
const asyncHandler = require('express-async-handler')
const { userData, adminData } = require('../data/dataTest')

const fnInsertUser = async (user) => {
    await User.create({
        userId: user.userId,
        name: user.name,
        birthday: user.birthday,
        address: user.address,
        classStudy: user.classStudy,
        email: user.email,
        phone: user.phone,
        password: '123456'
    })
}

const insertUsers = asyncHandler(async (req, res) => {
    const promises = []
    for (let user of userData) {
        promises.push(fnInsertUser(user))
    }
    await Promise.all(promises)
    return res.status(200).json('Done')
})

const fnInsertAdmin = async (admin) => {
    await Admin.create({
        email: admin.email,
        name: admin.name,
        password: '123456'
    })
}

const insertAdmins = asyncHandler(async (req, res) => {
    const promises = []
    for (let admin of adminData) {
        promises.push(fnInsertAdmin(admin))
    }
    await Promise.all(promises)
    return res.status(200).json('Done')
})

module.exports = {
    insertUsers,
    insertAdmins
}