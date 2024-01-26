const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema({
    students: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
    ,
    roomNumber: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    suite: {
        type: mongoose.Types.ObjectId,
        ref: 'Suite',
    },
    bill: {
        type: mongoose.Types.ObjectId,
        ref: 'Bill',
    }
},
    {
        timestamps: true,
    });

//Export the model
module.exports = mongoose.model('Room', roomSchema);