const User = require('../models/user')
const Admin = require('../models/admin')
const asyncHandler = require('express-async-handler')
const { generateAccessToken } = require('../middlewares/jwt')

const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body
    if (!email, !password, !role) {
        throw new Error('Missing Inputs')
    }
    if (role === 'admin') {
        const response = await Admin.findOne({ email })
        if (response && await response?.isCorrectPassword(password)) {
            const accessToken = generateAccessToken(response._id, response.role)
            return res.status(200).json({
                success: true,
                accessToken,
                response,
            })
        }
        else {
            throw new Error('Invalid credentials')
        }
    }
    else {
        const response = await User.findOne({ email })
        if (response && await response?.isCorrectPassword(password)) {
            const accessToken = generateAccessToken(response._id, response.role)
            return res.status(200).json({
                success: true,
                accessToken,
                response,
            })
        }
        else {
            throw new Error('Invalid credentials')
        }
    }
})

module.exports = {
    login,
}