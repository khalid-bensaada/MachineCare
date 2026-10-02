const Machine = require('../models/Machine');

async function createMachine(machineData) {
    const newMachine = new Machine(machineData);
    return await newMachine.save();
}

async function getAllMachines() {
    return await Machine.find();
}

async function getMachineById(id) {
    return await Machine.findById(id);
}

async function updateMachine(id, updateData) {
    return await Machine.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );
}

async function deleteMachine(id) {
    return await Machine.findByIdAndDelete(id);
}

module.exports = {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
};