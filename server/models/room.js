const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema({
    max_people: {
        type: Number,
        required: true,
    },
    roomprice: {
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
},
    {
        timestamps: true,
    });

//Export the model
module.exports = mongoose.model('Room', roomSchema);