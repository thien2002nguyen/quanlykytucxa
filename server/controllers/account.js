const User = require('../models/user')
const Admin = require('../models/admin')
const asyncHandler = require('express-async-handler')

const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body
    if (!email, !password, !role) {
        throw new Error('Missing Inputs')
    }
    if (role === 'admin') {
        const response = await Admin.findOne({ email })
        if (response && await response?.isCorrectPassword(password)) {
            return res.status(200).json({
                success: true,
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
            return res.status(200).json({
                success: true,
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