const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var employerSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    position: {
        type: mongoose.Types.ObjectId,
        ref: 'Suite'
    },
    role: {
        type: String,
        default: 'manage'
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });

//Export the model
module.exports = mongoose.model('Employer', employerSchema);