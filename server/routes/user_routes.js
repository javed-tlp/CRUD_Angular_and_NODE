const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const projectController = require('../controllers/project_controller');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file to avoid duplicates
  }
});

// Initialize multer with storage settings
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Set file size limit (5MB)
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

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
