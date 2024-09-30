const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const projectController = require('../controllers/project_controller');
const upload = require('../middlewares/multerConfig'); // Import multer configuration
const { verifyToken } = require('../middlewares/auth'); // Import JWT middleware

// User Authentication Routes
router.post('/user/register', userController.register);  // Registration route
router.post('/user/login', userController.login);        // Login route
router.post('/user/logout', verifyToken, userController.logout); // Logout route


// User CRUD Routes (Protected with verifyToken middleware)
router.post('/user/post', upload.single('file'), userController.postData);      // Protected route to post user data
router.post('/user/get', userController.getData);                               // Protected route to get user data
router.post('/user/get/:id', userController.getDatabyid);                       // Protected route to get user data by ID
router.post('/user/update/:id', upload.single('file'), userController.updateData); // Protected route to update user data
router.post('/user/delete/:id', userController.deleteData);                     // Protected route to delete user
router.post('/user/details/:id', userController.getDetailsbyid);                // Protected route to get user details

// Project CRUD Routes (Protected with verifyToken middleware)
router.post('/projects/create', upload.single('file'), projectController.createProject);   // Protected route to create a project
router.post('/projects/list', projectController.getProjects);                              // Protected route to list projects
router.post('/projects/get', projectController.getProjectById);                            // Protected route to get project by ID
router.post('/projects/update', upload.single('file'), projectController.updateProject);   // Protected route to update a project
router.post('/projects/delete', projectController.deleteProject);                          // Protected route to delete a project

module.exports = router;
