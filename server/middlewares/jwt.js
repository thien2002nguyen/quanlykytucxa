const jwt = require('jsonwebtoken')

const generateAccessToken = (uid, role) =>
    jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, { expiresIn: '7d' })

module.exports = {
    generateAccessToken,
}