const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const projectController = require('../controllers/project_controller');
const upload = require('../middlewares/multerConfig'); // Import multer configuration

// User Routes
router.post('/user/post', upload.single('file'), userController.postData);
router.post('/user/get', userController.getData);
router.post('/user/get/:id', userController.getDatabyid);
router.post('/user/update/:id', upload.single('file'), userController.updateData);
router.post('/user/delete/:id', userController.deleteData);
router.post('/user/details/:id', userController.getDetailsbyid);

// Project Routes
router.post('/projects/create', upload.single('file'), projectController.createProject);
router.post('/projects/list', projectController.getProjects);
router.post('/projects/get', projectController.getProjectById); // Send ID in request body
router.post('/projects/update', upload.single('file'), projectController.updateProject); // Send ID and data in request body
router.post('/projects/delete', projectController.deleteProject); // Send ID in request body

module.exports = router;
