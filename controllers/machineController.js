const Machine = require('../models/Machine');

export async function createMachine(req , res){

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

export async function getAllMachines(req ,res){

    try {
        const machines = await Machine.find();
        res.status(200).json(machines);

    }
    catch (error){
        res.status(500).json({ message: "Error creating machine", error: error.message });
    }
}

export async function getMachineById(req ,res){

    try {
        const machine = await Machine.findById(req.params.id);

        if(!machine){
            return res.status(404).json({ message: " can't find the machine by this id"});
        }

        res.status(200).json(machine);
    }
    catch (error){
        res.status(500).json({ message: "Error creating machine", error: error.message });
    }
}

export async function updateMachine(req , res){

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
        res.status(500).json({ message: "Error creating machine", error: error.message });
    }
}