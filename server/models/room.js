const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema({
    numberRoom: {
        type: Number,
        required: true,
    },
    numberPeople: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumb: {
        filename: String,
        path: String
    },
    images: [
        {
            filename: String,
            path: String
        }
    ],
    description: {
        type: String,
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
},
    {
        timestamps: true,
    });

//Export the model
module.exports = mongoose.model('Room', roomSchema);