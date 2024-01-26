const Student = require('../models/student')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = asyncHandler(async (req, res) => {
    const { code, password } = req.body
    if (!code, !password) {
        throw new Error('Missing Inputs')
    }
    const response = await Student.findOne({ code })
    if (response && await response?.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const newRefreshToken = generateRefreshToken(response._id)
        await Student.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
            refreshToken: newRefreshToken
        })
    }
    else {
        throw new Error('Invalid credentials')
    }
})

const createStudent = asyncHandler(async (req, res) => {
    const { code, name, brithday, address, classStudy, email } = req.body
    if (!code, !name, !brithday, !address, !classStudy, !email) {
        throw new Error('Missing Inputs')
    }
    const rs = Student.findOne({ code })
    if (!rs) {
        throw new Error("Code already exists")
    }
    const response = await Student.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Created student' : 'Somethings went wrong'
    })
})

const getStudent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const student = await Student.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: student ? true : false,
        rs: student ? student : 'Student not found'
    })
})

const updateStudent = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id) {
        throw new Error('Missing inputs')
    }
    const { password } = req.body
    if (password) {
        const salt = bcrypt.genSaltSync(10)
        req.body.password = await bcrypt.hash(password, salt)
    }
    const response = await Student.findByIdAndUpdate(_id, req.body, { new: true }).select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const deleteStudent = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) {
        throw new Error('Missing inputs')
    }
    const response = await Student.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? `Student with email ${response.email} delete` : 'No student delete'
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        throw new Error('No refresh token in cookies')
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decode) => {
        if (err) {
            return res.status(401).json({
                success: false,
                mes: 'Invalid refresh token'
            })
        }
        const response = await Student.findOne({ _id: decode._id, refreshToken })
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ?
                generateAccessToken(response.id, response.role) : 'Refresh token not matched'
        })
    })
})

module.exports = {
    login,
    createStudent,
    getStudent,
    updateStudent,
    deleteStudent,
    refreshAccessToken,
}