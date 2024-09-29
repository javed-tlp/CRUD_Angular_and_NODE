const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Sequential ID
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

// Export functions for project operations
module.exports = {
  createProject: async (data) => {
    // Find the highest ID currently in use
    const lastProject = await Project.findOne().sort({ id: -1 }); // Sort by ID descending
    const nextId = lastProject ? lastProject.id + 1 : 1; // Increment the ID

    data.id = nextId; // Assign the new ID
    const project = new Project(data);
    return await project.save(); // Save the new project
  },

  getAllProjects: async () => {
    return await Project.find({ status: true });
  },

  getProjectById: async (id) => {
    return await Project.findOne({ id: id, status: true }); // Find by sequential ID
  },

  updateProject: async (id, data) => {
    return await Project.findOneAndUpdate({ id: id }, data, { new: true }); // Update by sequential ID
  },

  deleteProject: async (id) => {
    return await Project.findOneAndUpdate({ id: id }, { status: false }); // Soft delete by sequential ID
  },
};
