const PatientResource = require('../models/patientResourceModel');

// Get all patient resources with only title and image (for main page)
const getAllPatientResources = async (req, res) => {
  try {
    const resources = await PatientResource.find({}, 'title image'); // Select only title and image
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
};

// Get full details of a specific patient resource by ID
const getPatientResourceById = async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await PatientResource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource', error });
  }
};

// Create a new patient resource
const createPatientResource = async (req, res) => {
  const { title, description, image, videos, weblinks } = req.body;

  if (!title || !description || !image) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const newResource = new PatientResource({
    title,
    description,
    image,
    videos,
    weblinks
  });

  try {
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate key error: Resource already exists' });
    } else {
      res.status(500).json({ message: 'Error creating resource', error });
    }
  }
};

// Update a patient resource by ID
const updatePatientResource = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, videos, weblinks } = req.body;

  try {
    const updatedResource = await PatientResource.findByIdAndUpdate(
      id,
      { title, description, image, videos, weblinks },
      { new: true, runValidators: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(updatedResource);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate key error: Resource already exists' });
    } else {
      res.status(500).json({ message: 'Error updating resource', error });
    }
  }
};

// Delete a patient resource by ID
const deletePatientResource = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedResource = await PatientResource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
};

module.exports = {
  getAllPatientResources,
  getPatientResourceById,
  createPatientResource,
  updatePatientResource,
  deletePatientResource
};
