// controllers/project_controller.js
const model = require('../models/project_model');

exports.createProject = async (req, res) => {
  try {
    const projectData = {
      title: req.body.title,
      description: req.body.description,
    };
    
    const result = await model.createProject(projectData);
    res.send({ message: 'Project created successfully', data: result });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).send({ message: 'Project creation failed', error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const result = await model.getAllProjects();
    res.send({ message: 'Projects retrieved successfully', data: result });
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).send({ message: 'Projects retrieval failed', error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const result = await model.getProjectById(req.body.id);
    if (!result) {
      return res.status(404).send({ message: 'Project not found' });
    }
    res.send({ message: 'Project fetched successfully', data: result });
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    res.status(500).send({ message: 'Project fetch failed', error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const projectData = {
      title: req.body.title,
      description: req.body.description,
    };
    
    const result = await model.updateProject(req.body.id, projectData);
    res.send({ message: 'Project updated successfully', data: result });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).send({ message: 'Project update failed', error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const result = await model.deleteProject(req.body.id);
    res.send({ message: 'Project deleted successfully', data: result });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).send({ message: 'Project deletion failed', error: error.message });
  }
};
