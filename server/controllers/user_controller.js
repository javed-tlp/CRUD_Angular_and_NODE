const model = require("../models/user_model");
const moment = require("moment");

exports.postData = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;

    const userData = {
      Name: req.body.Name,
      Email: req.body.Email,
      Age: req.body.Age,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"), // Set creation timestamp
      image_path: imagePath
    };

    const result = await model.postDetail(userData);
    res.send({ message: "Data added successfully", data: result });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).send({ message: "Data addition failed", error: error.message });
  }
};

exports.getData = async (req, res) => {
  try {
    const result = await model.getDetails();
    res.send({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: "Data retrieval failed", error: error.message });
  }
};

exports.getDatabyid = async (req, res) => {
  try {
    const result = await model.getDetailsbyId(req.params.id);
    res.send({ message: "Data fetched successfully", data: result });
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    res.status(500).send({ message: "Data fetch failed", error: error.message });
  }
};

exports.getDetailsbyid = async (req, res) => {
  try {
    const result = await model.getallDetailsbyId(req.params.id);
    res.send({ message: "Data fetched successfully", data: result });
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    res.status(500).send({ message: "Data fetch failed", error: error.message });
  }
};

exports.updateData = async (req, res) => {
  try {
    // Check if there's a new file uploaded, otherwise keep the existing image path
    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const userData = {
      id: req.params.id,
      Name: req.body.Name,
      Email: req.body.Email,
      Age: req.body.Age,
      // If there's no new image uploaded, retain the existing image path from the database
      image_path: imagePath || req.body.existingImage || null
    };

    const result = await model.updateDetails(userData);
    res.send({ message: "Data updated successfully", data: result });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send({ message: "Data update failed", error: error.message });
  }
};


exports.deleteData = async (req, res) => {
  try {
    const result = await model.deleteDetails(req.params.id);
    // console.log("Data deleted -->",result)
    res.send({ message: "Data deleted successfully", data: result });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send({ message: "Data deletion failed", error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const result = await model.getProjectsDetails();
    res.send({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: "Data retrieval failed", error: error.message });
  }
};

exports.getProjectsDetails = async (req, res) => {
  try {
    const projectId = req.body.id;
    const result = await model.getProjectDetailsById(projectId);

    if (!result || result.length === 0) {
      return res.status(404).send({ message: "Project not found" });
    }

    res.send({ message: "Project details retrieved successfully", data: result });
  } catch (error) {
    console.error('Error retrieving project details:', error);
    res.status(500).send({ message: "Project details retrieval failed", error: error.message });
  }
};
