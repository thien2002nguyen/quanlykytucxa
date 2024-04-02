const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var billSchema = new mongoose.Schema({
    info: [
        {
            title: String,
            price: Number,
        }
    ],
    paid: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Room',
        }
    ]
},
    {
        timestamps: true,
    });

//Export the model
module.exports = mongoose.model('Bill', billSchema);