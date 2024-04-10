const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumb: {
        type: String,
    },
});

//Export the model
module.exports = mongoose.model('Service', serviceSchema);