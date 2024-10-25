const express = require('express');
const authRoutes = require('./routes/authRoutes');
const patientResourceRoutes = require('./routes/patientResourceRoutes');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', patientResourceRoutes);

module.exports = app;
