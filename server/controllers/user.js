const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id)
    const room = await Room.findOne({ users: _id }).select('numberRoom')
    return res.status(200).json({
        success: user ? true : false,
        user: user ? user : 'User not found',
        room: room ? room : 'Room not found'
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { name, birthday, address, classStudy, email, phone, password, role } = req.body
    if (!_id || Object.keys(req.body).length === 0) {
        throw new Error('Missing inputs')
    }
    const data = {}
    if (role) {
        throw new Error('Can not update role')
    }
    if (name) data.name = name
    if (birthday) data.birthday = birthday
    if (address) data.address = address
    if (classStudy) data.classStudy = classStudy
    if (email) data.email = email
    if (phone) data.phone = phone
    if (password) {
        const salt = bcrypt.genSaltSync(10)
        data.password = await bcrypt.hash(password, salt)
    }
    if (req.file) {
        data.avatar = {
            filename: req.file.filename,
            path: req.file.path
        }
    }
    const response = await User.findByIdAndUpdate(_id, data, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const registerForRoom = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { rid } = req.params
    if (!_id || !rid) {
        throw new Error('Missing input')
    }
    const findUser = await User.findById(_id)
    if (findUser.roomId) {
        throw new Error('The user has registered for the room')
    }
    const response = await User.findByIdAndUpdate(_id,
        { $push: { roomId: rid } }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const createUser = asyncHandler(async (req, res) => {
    const { userId, name, brithday, address, classStudy, email } = req.body
    if (!userId, !name, !brithday, !address, !classStudy, !email) {
        throw new Error('Missing Inputs')
    }
    const rs = User.findOne({ userId })
    if (!rs) {
        throw new Error("UserId already exists")
    }
    const response = await User.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Created user' : 'Somethings went wrong'
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (!uid) {
        throw new Error('Missing inputs')
    }
    const response = await User.findByIdAndDelete(uid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Deleted` : 'No user delete'
    })
})

const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken -password')
    return res.status(200).json({
        success: response ? true : false,
        rs: response ? response : 'User not found'
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (!uid) {
        throw new Error('Missing inputs')
    }
    const { password } = req.body
    if (password) {
        const salt = bcrypt.genSaltSync(10)
        req.body.password = await bcrypt.hash(password, salt)
    }
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-refreshToken -password')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

module.exports = {
    createUser,
    getCurrent,
    updateUser,
    deleteUser,
    getUsers,
    updateUserByAdmin,
    registerForRoom,
}