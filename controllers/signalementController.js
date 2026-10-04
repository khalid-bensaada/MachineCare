const signalementService = require("../services/signalementService");
const Machine = require("../models/Machine");

async function createSignalement(req ,res){

    try {
        const signalement = await signalementService.createSignalement(req.body, req.user.id);

        res.status(201).json(signalement);
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid machine id format" });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error creating signalement", error: error.message });
    }
}

async function getAllSignalements(req ,res){

    try {
        const signalements = await signalementService.getAllSignalements(req.query);

        res.status(200).json(signalements);
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid machine id format" });
        }

        res.status(500).json({ message: "Error getting signalements", error: error.message });
    }
}

async function getSignalementById(req ,res){

    try {
        const signalement = await signalementService.getSignalementById(req.params.id);

        if(!signalement){
            return res.status(404).json({ message: " can't find the signalement by this id"});
        }

        res.status(200).json(signalement);
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid signalement id format" });
        }

        res.status(500).json({ message: "Error getting signalement", error: error.message });
    }
}

async function getSignalementsByMachine(req ,res){

    try {
        const signalements = await signalementService.getSignalementsByMachine(req.params.id);

        if(!signalements){
            return res.status(404).json({ message: " can't find the machine by this id"});
        }

        res.status(200).json(signalements);
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid machine id format" });
        }

        res.status(500).json({ message: "Error getting machine signalements", error: error.message });
    }
}

async function updateSignalement(req ,res){

    try {
        const signalement = await signalementService.updateSignalement(req.params.id, req.body);

        if(!signalement){
            return res.status(404).json({ message: " can't find the signalement by this id"});
        }

        res.status(200).json(signalement);
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid signalement id format" });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error updating signalement", error: error.message });
    }
}


async function deleteSignalement(req ,res){

    try {
        const signalement = await signalementService.deleteSignalement(req.params.id);

        if(!signalement){
            return res.status(404).json({ message: " can't find the signalement by this id"});
        }

        res.status(200).json({ message: "Signalement deleted successfully" });
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid signalement id format" });
        }

        res.status(500).json({ message: "Error deleting signalement", error: error.message });
    }
}

module.exports = { createSignalement, getAllSignalements, getSignalementById, updateSignalement, deleteSignalement , getSignalementsByMachine };