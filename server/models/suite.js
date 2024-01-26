const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var suiteSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Types.ObjectId,
        ref: 'Employer'
    },
    rooms: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    }
    ,
    gender: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true,
    });

//Export the model
module.exports = mongoose.model('Suite', suiteSchema);