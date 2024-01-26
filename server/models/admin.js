const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var adminSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin'
    }
},
    {
        timestamps: true
    });

//Export the model
module.exports = mongoose.model('Admin', adminSchema);