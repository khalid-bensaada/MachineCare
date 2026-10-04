const Machine = require('../models/Machine');
const Signalement = require("../models/Signalement");

async function createMachine(req , res){

    try {

        const { reference ,nom ,etat ,atelier} = req.body;
        const newMachin = new Machine({ reference ,nom ,etat ,atelier});

        const saveMachine = await newMachin.save();
        res.status(201).json(saveMachine);
    }
    catch (error){
        res.status(500).json({ message: "Error creating machine", error: error.message });
    }
}

async function getAllMachines(req ,res){

    try {
        const filter = {};

        if(req.query.atelier) filter.atelier = req.query.atelier;
        if(req.query.etat) filter.etat = req.query.etat;

        const machines = await Machine.find(filter);

        res.status(200).json(machines);
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid filter format" });
        }

        res.status(500).json({ message: "Error getting machines", error: error.message });
    }
}

async function getMachineById(req ,res){

    try {
        const machine = await Machine.findById(req.params.id);

        if(!machine){
            return res.status(404).json({ message: " can't find the machine by this id"});
        }

        res.status(200).json(machine);
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid machine id format" });
        }

        res.status(500).json({ message: "Error getting machine", error: error.message });
    }
}

async function updateMachine(req , res){

    try {

        const machineUpdate = await Machine.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true , runValidators: true
            }
        );
        if(!machineUpdate){
            return res.status(404).json({ message: "can't update this machine"});
        }
        res.status(200).json(machineUpdate);
    }

    catch (error){
        res.status(500).json({ message: "Error updating machine", error: error.message });
    }
}

async function deleteMachine(req ,res){

    try {
        const signalementsCount = await Signalement.countDocuments({ machine: req.params.id });

        if(signalementsCount > 0){
            return res.status(409).json({ message: "Can't delete a machine that has signalements" });
        }

        const machine = await Machine.findByIdAndDelete(req.params.id);

        if(!machine){
            return res.status(404).json({ message: " can't find the machine by this id"});
        }

        res.status(200).json({ message: "Machine deleted successfully" });
    }
    catch (error){

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid machine id format" });
        }

        res.status(500).json({ message: "Error deleting machine", error: error.message });
    }
}

module.exports = {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
};