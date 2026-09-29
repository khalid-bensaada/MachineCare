
const mongoose = require('mongoose');

const signalementSchema = new mongoose.Schema({

    machine: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Machine',
        required: true
    },

    description: {
        type: String,
        required: true
    },

    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    statut: {
        type: String,
        enum: ['ouvert', 'en cours', 'résolu'],
        default: 'ouvert'
    },

    noteResolution: {
        type: String
    },

    dateResolution: {
        type: Date
    }
})