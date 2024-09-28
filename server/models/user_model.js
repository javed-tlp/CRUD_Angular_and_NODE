const mongoose = require('mongoose');
const moment = require("moment");

// Define the user schema
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  Age: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  image_path: { type: String, default: null },
  status: { type: Number, default: 1 } // For soft delete functionality
});

// Create the User model
const User = mongoose.model('User', userSchema);

const user = {};

// MongoDB methods
user.postDetail = (data) => {
  return new User(data).save(); // Save the new user to the database
};

user.getDetails = () => {
  return User.find({ status: 1 }); // Get all users with status 1
};

user.getDetailsbyId = (id) => {
  return User.findOne({ _id: id, status: 1 }); // Get a user by ID with status 1
};

user.getallDetailsbyId = (id) => {
  return User.findOne({ _id: id, status: 1 }); // Same as above for consistency
};

user.updateDetails = (data) => {
  return User.findByIdAndUpdate(data.id, data, { new: true }); // Update user data
};

user.deleteDetails = (id) => {
  return User.findByIdAndUpdate(id, { status: 0 }, { new: true }); // Soft delete user
};

// Project methods would be similar, adjust as necessary
user.getProjectsDetails = () => {
  // Implement project fetching logic
};

user.getProjectDetailsById = (id) => {
  // Implement fetching project details by ID
};

module.exports = user;
