const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: [String],
    required: true
  }
});

const Project = mongoose.model('project', ProjectSchema);
module.exports = Project;
