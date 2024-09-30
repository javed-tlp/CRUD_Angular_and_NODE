const mongoose = require('mongoose');

// Define the registered user schema
const registeredUserSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Sequential ID
  Name: { type: String, required: true }, // User's name
  Email: { type: String, required: true, unique: true }, // User's email, must be unique
  Age: { type: Number, required: true }, // User's age
  password: { type: String, required: true }, // Store hashed password
  created_at: { type: Date, default: Date.now }, // Date of registration
  token: { type: String, default: null } // Field to store the JWT token
});

// Create the RegisteredUser model
const RegisteredUser = mongoose.model('RegisteredUser', registeredUserSchema);

// MongoDB methods for RegisteredUser
const registeredUser = {};

// Register a new user
registeredUser.postDetail = async (data) => {
  // Get the last registered user to increment the ID
  const lastUser = await RegisteredUser.findOne().sort({ id: -1 });
  const nextId = lastUser ? lastUser.id + 1 : 1; // Increment ID
  data.id = nextId; // Set the new ID

  const user = new RegisteredUser(data);
  return user.save(); // Save the new user to the database
};

registeredUser.findByEmail = (email) => {
    console.log(`Searching for user with email: ${email}`); // Log the email
    return RegisteredUser.findOne({ Email: email })
      .then(user => {
        if (!user) {
          throw new Error('User not found'); // Throw an error if no user is found
        }
        return user; // Return the found user
      })
      .catch(err => {
        console.error(err); // Log any errors that occur during the search
        throw err; // Re-throw the error for further handling
      });
  };
  
// Update the token for a user
registeredUser.updateToken = (userId, token) => {
  // Find the user by their ID and update their JWT token
  return RegisteredUser.findByIdAndUpdate(userId, { token: token }, { new: true });
};

// Export the registered user model
module.exports = registeredUser;
