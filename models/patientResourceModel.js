const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Use UUID for unique ID generation

const videoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  }
});

const weblinkSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  }
});

const patientResourceSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    default: uuidv4
  },
  title: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  videos: [videoSchema], // Array of video objects with title and URL
  weblinks: [weblinkSchema] // Array of weblink objects with text and URL
});

module.exports = mongoose.model('PatientResource', patientResourceSchema);
