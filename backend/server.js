require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const codeConversionRoutes = require('./routes/codeConversionRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const historyRoutes = require('./routes/historyRoutes');

// connect to mongodb
connectDB();

const app = express();

app.use(cors({
    origin: ['https://code-converter-app-zeta.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
}));

// Allow OPTIONS preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ping backend to warm up server
app.get('/api/ping', async (req, res) => {
  try {
    //await db.collection('NoteHistory').findOne(); // optional, or skip for pure wake-up
    res.status(200).send('Backend awake');
  } catch (err) {
    res.status(500).send('Error warming up backend');
  }
});

// Routes
app.use('/api/convert', codeConversionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/history', historyRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));