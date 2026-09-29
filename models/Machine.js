
const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({

    reference: {
        type: String,
        required: true,
        unique: true
    },

    nom: {
        type: String,
        required: true
    },

    atelier: {
        type: String,
        required: true
    },

    etat: {
        type: String,
        enum: ['disponible' , 'en maintenance' , 'hors service'],
        default: 'disponible'
    },

    timestamps: true
})