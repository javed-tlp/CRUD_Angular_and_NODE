const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Sequential ID
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Age: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  image_path: { type: String, default: null },
  token: { type: String, default: null }, // Field to store the JWT token
  status: { type: Number, default: 1 } // For soft delete functionality
});

// Create the User model
const User = mongoose.model('User', userSchema);

const user = {};

// MongoDB methods
user.postDetail = async (data) => {
  const lastUser = await User.findOne().sort({ id: -1 });
  const nextId = lastUser ? lastUser.id + 1 : 1;
  data.id = nextId;
  return new User(data).save();
};

user.getDetails = () => {
  return User.find({ status: 1 });
};

user.getDetailsbyId = (id) => {
  return User.findOne({ id: id, status: 1 });
};

user.updateDetails = (data) => {
  return User.findOneAndUpdate({ id: data.id }, data, { new: true });
};

user.deleteDetails = (id) => {
  return User.findOneAndUpdate({ id: id }, { status: 0 }, { new: true });
};

user.findUserByEmail = (email) => {
  return User.findOne({ Email: email, status: 1 });
};

user.updateToken = (id, token) => {
  return User.findOneAndUpdate({ id: id }, { token: token }, { new: true });
};

module.exports = user;
