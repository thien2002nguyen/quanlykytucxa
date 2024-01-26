const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var newsSchema = new mongoose.Schema({
    images: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });

//Export the model
module.exports = mongoose.model('News', newsSchema);