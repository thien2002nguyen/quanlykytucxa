const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var billSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    students: {
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    }
},
    {
        timestamps: true,
    });

//Export the model
module.exports = mongoose.model('Bill', billSchema);