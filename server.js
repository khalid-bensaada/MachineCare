require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const createDefaultUser = require('./utils/seed');
const machineRoutes = require('./routes/machineRoutes');
const authRoutes = require('./routes/userRoutes');
const signalRoutes = require('./routes/signalementRoutes');

const app = express();
app.use(express.json());
app.use('/api/machines', machineRoutes);
app.use('/api/users', authRoutes);
app.use('/api/signalements', signalRoutes);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.send('API is running...'));

async function start(){
    await connectDB();
    await createDefaultUser();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start();