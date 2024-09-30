const model = require("../models/user_model"); // Import the user model for CRUD operations
const registeredUserModel = require("../models/registeredUser_model"); // Import the registered user model
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT token generation
const moment = require("moment"); // For handling dates

// Register a new user
exports.register = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // hashedPassword = decrypt(hashedPassword)
    // console.log("Password", hashedPassword)

    const userData = {
      Name: req.body.Name,
      Email: req.body.Email,
      Age: req.body.Age,
      password: hashedPassword, // Store hashed password
      created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    const result = await registeredUserModel.postDetail(userData); // Save to registered users collection
    console.log("Resut_>>", result)
    res.send({ message: "User registered successfully", data: result });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send({ message: "Registration failed", error: error.message });
  }
};

// Login an existing user
exports.login = async (req, res) => {
  try {
    // Log the entire request body to check what is received
    console.log("Received request body:", req.body);

    // Ensure you're accessing the correct property
    const email = req.body.email; // Change to lowercase to match the frontend
    const password = req.body.password;

    // Log the email and password for debugging
    console.log("Email from request body:", email);
    console.log("Password from request body:", password);

    // Attempt to find the user by email
    const user = await registeredUserModel.findByEmail(email);
    console.log("User found in database:", user);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare the hashed password with the provided password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log("Token generated:", token);

    // Save the token in the registered user collection
    await registeredUserModel.updateToken(user._id, token); // Ensure this method exists in your model

    res.send({ message: "Login successful", token: token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ message: "Login failed", error: error.message });
  }
};


// Logout the user
exports.logout = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the request (provided by the verifyToken middleware)

    // Clear the token in the registered user collection
    await registeredUserModel.updateToken(userId, null);

    res.send({ message: "Logout successful" });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send({ message: "Logout failed", error: error.message });
  }
};


// Post user data (Protected)
exports.postData = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null; // Format image path

    const userData = {
      Name: req.body.Name,
      Email: req.body.Email,
      Age: req.body.Age,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"), // Set creation timestamp
      image_path: imagePath
    };

    const result = await model.postDetail(userData); // Save data using user model
    res.send({ message: "Data added successfully", data: result });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).send({ message: "Data addition failed", error: error.message });
  }
};

// Get all user data (Protected)
exports.getData = async (req, res) => {
  try {
    const result = await model.getDetails(); // Get data using user model
    res.send({ message: "Data retrieved successfully", data: result });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send({ message: "Data retrieval failed", error: error.message });
  }
};

// Get user data by ID (Protected)
exports.getDatabyid = async (req, res) => {
  try {
    const result = await model.getDetailsbyId(req.params.id); // Get data by ID
    res.send({ message: "Data fetched successfully", data: result });
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    res.status(500).send({ message: "Data fetch failed", error: error.message });
  }
};

// Get user details by ID (Protected)
exports.getDetailsbyid = async (req, res) => {
  try {
    const result = await model.getallDetailsbyId(req.params.id); // Get user details by ID
    res.send({ message: "Data fetched successfully", data: result });
  } catch (error) {
    console.error('Error fetching data by ID:', error);
    res.status(500).send({ message: "Data fetch failed", error: error.message });
  }
};

// Update user data (Protected)
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

    const result = await model.updateDetails(userData); // Update data using user model
    res.send({ message: "Data updated successfully", data: result });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send({ message: "Data update failed", error: error.message });
  }
};

// Delete user data (Protected)
exports.deleteData = async (req, res) => {
  try {
    const result = await model.deleteDetails(req.params.id); // Delete user by ID
    res.send({ message: "Data deleted successfully", data: result });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send({ message: "Data deletion failed", error: error.message });
  }
};

// Optional: Add other methods for additional functionalities if needed
