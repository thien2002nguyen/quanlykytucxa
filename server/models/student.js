const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')
const crypto = require('crypto')
// Declare the Schema of the Mongo model
var studentSchema = new mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    classStudy: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: 'student',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    room: {
        type: mongoose.Types.ObjectId,
        ref: 'Room',
    },
    checkOutDate: {
        type: Date,
    },
    checkInDate: {
        type: Date,
    },
    refreshToken: {
        type: String,
    },
},
    {
        timestamps: true,
    });

studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

studentSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    },
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

//Export the model
module.exports = mongoose.model('Student', studentSchema);