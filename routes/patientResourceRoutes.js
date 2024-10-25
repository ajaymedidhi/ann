const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  getAllPatientResources,
  getPatientResourceById,
  createPatientResource,
  updatePatientResource,
  deletePatientResource
} = require('../controllers/patientResourceController');

// Get all patient resources with only title and image (protected)
router.get('/', authenticateToken, getAllPatientResources);

// Get full details of a specific patient resource by ID (protected)
router.get('/:id', authenticateToken, getPatientResourceById);

// Create a new patient resource (protected)
router.post('/', authenticateToken, createPatientResource);

// Update a patient resource by ID (protected)
router.put('/:id', authenticateToken, updatePatientResource);

// Delete a patient resource by ID (protected)
router.delete('/:id', authenticateToken, deletePatientResource);

module.exports = router;
