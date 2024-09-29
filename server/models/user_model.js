const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Sequential ID
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
user.postDetail = async (data) => {
  // Find the highest ID currently in use
  const lastUser = await User.findOne().sort({ id: -1 }); // Sort by ID descending
  const nextId = lastUser ? lastUser.id + 1 : 1; // Increment the ID

  data.id = nextId; // Assign the new ID
  return new User(data).save(); // Save the new user to the database
};

user.getDetails = () => {
  return User.find({ status: 1 }); // Get all users with status 1
};

user.getDetailsbyId = (id) => {
  return User.findOne({ id: id, status: 1 }); // Get a user by ID with status 1
};

user.getallDetailsbyId = (id) => {
  return User.findOne({ id: id, status: 1 }); // Same as above for consistency
};

user.updateDetails = (data) => {
  return User.findOneAndUpdate({ id: data.id }, data, { new: true }); // Update user data
};

user.deleteDetails = (id) => {
  return User.findOneAndUpdate({ id: id }, { status: 0 }, { new: true }); // Soft delete user
};

module.exports = user;
