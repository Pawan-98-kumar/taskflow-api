
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
dotenv.config();

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');

app.use('/auth', authRoutes);
app.use('/tasks', authenticateToken, taskRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

startServer();
