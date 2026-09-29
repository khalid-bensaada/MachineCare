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