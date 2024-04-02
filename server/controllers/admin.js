const Admin = require('../models/admin')
const asyncHandler = require('express-async-handler')

const createAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name, !email, !password) {
        throw new Error('Missing Inputs')
    }
    const rs = Admin.findOne({ email })
    if (!rs) {
        throw new Error("Email already exists")
    }
    const response = await Admin.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Created admin' : 'Somethings went wrong'
    })
})

module.exports = {
    createAdmin,
}
