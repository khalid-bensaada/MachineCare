const express = require('express');
const router = express.Router();
const signalementController = require('../controllers/signalementController');
const protect = require('../middlewares/authMiddleware');

router.use(protect);

router.post('/', signalementController.createSignalement);
router.get('/', signalementController.getAllSignalements);
router.get('/:id', signalementController.getSignalementById);
router.get('/:id/signalements', protect, signalementController.getSignalementsByMachine);
router.put('/:id', signalementController.updateSignalement);
router.delete('/:id', signalementController.deleteSignalement);

module.exports = router;