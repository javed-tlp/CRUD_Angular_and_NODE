const model = require("../models/user_model");

exports.postData = async (req, res) => {
  try {
    // Check if an image file was uploaded
    const imagePath = req.file ? req.file.path : null;

    // Prepare user data for database insertion
    const userData = {
      Name: req.body.Name,
      Email: req.body.Email,
      Age: req.body.Age,
      image_path: imagePath
    };

    const result = await model.postDetail(userData);
    res.send({ message: "Data ad successfully", data: result });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).send({ message: "Data addition failed", error: error.message });
  }
};

exports.getData = async (req, res) => {
  try {
    const result = await model.getDetails();
    // console.log("Result in Get--->",result)
    res.send({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: "Data retrieval failed", error: error.message });
  }
};

exports.getDatabyid = async (req, res) => {
  try {
    const result = await model.getDetailsbyId(req.params.id);
    // console.log("Result",result)
    res.send({ message: "Data fetched successfully", data: result });
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    res.status(500).send({ message: "Data fetch failed", error: error.message });
  }
};

// In your controller file (e.g., `controllers/user_controller.js`)
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
    const imagePath = req.file ? req.file.path : null;

    const userData = {
      id: req.params.id,
      Name: req.body.Name,
      Email: req.body.Email,
      Age: req.body.Age,
      image_path: imagePath
    };
    console.log("Result in Upadte--->",userData)


    const result = await model.updateDetails(userData);
    res.send({ message: "Data updated successfully", data: userData });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send({ message: "Data update failed", error: error.message });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const result = await model.deleteDetails(req.params.id);
    res.send({ message: "Data deleted successfully", data: result });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send({ message: "Data deletion failed", error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    // If you want to filter data based on something in req.body, you can use req.body here
    // For example: const status = req.body.status || 1;

    const result = await model.getProjectsDetails(); // Call the model method as it is
    res.send({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: "Data retrieval failed", error: error.message });
  }
};


exports.getProjectsDetails = async (req, res) => {
  try {
    const projectId = req.body.id; // Get project ID from request body
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
