// models/project_model.js
const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = {
  createProject: async (data) => {
    const project = new Project(data);
    return await project.save();
  },
  
  getAllProjects: async () => {
    return await Project.find({ status: true });
  },

  getProjectById: async (id) => {
    return await Project.findById(id);
  },

  updateProject: async (id, data) => {
    return await Project.findByIdAndUpdate(id, data, { new: true });
  },

  deleteProject: async (id) => {
    return await Project.findByIdAndUpdate(id, { status: false });
  },
};
