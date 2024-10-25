const express = require('express'); 
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const patientResourceRoutes = require('./routes/patientResourceRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies 
app.use(cors({
    origin: 'https://annphysiocare.com' // Allow only your website
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', patientResourceRoutes);

module.exports = app;
