const Signalement = require("../models/Signalement");

async function createSignalement(data, userId){
    const { machine, description } = data;

    return await Signalement.create({ machine, description, utilisateur: userId });
}

async function getAllSignalements(query){
    const filter = {};

    if(query.machine) filter.machine = query.machine;
    if(query.statut) filter.statut = query.statut;

    return await Signalement.find(filter)
        .populate("machine")
        .populate("utilisateur", "nom prenom email");
}

async function getSignalementById(id){
    return await Signalement.findById(id)
        .populate("machine")
        .populate("utilisateur", "nom prenom email");
}

async function updateSignalement(id, data){
    const signalement = await Signalement.findById(id);

    if(!signalement){
        return null;
    }

    const { description, statut, noteResolution } = data;

    if(description !== undefined) signalement.description = description;
    if(noteResolution !== undefined) signalement.noteResolution = noteResolution;

    if(statut !== undefined){
        signalement.statut = statut;
        signalement.dateResolution = statut === "résolu" ? new Date() : undefined;
    }

    await signalement.save();

    return signalement;
}

async function deleteSignalement(id){
    return await Signalement.findByIdAndDelete(id);
}

module.exports = { createSignalement, getAllSignalements, getSignalementById, updateSignalement, deleteSignalement };