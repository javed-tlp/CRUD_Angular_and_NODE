const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_controller');
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

// Routes
router.post('/post', upload.single('file'), controller.postData);
router.post('/get', controller.getData); // Changed to POST
router.post('/get/:id', controller.getDatabyid); // Changed to POST
router.post('/update/:id', upload.single('file'), controller.updateData); // Changed to POST
router.post('/delete/:id', controller.deleteData);
router.post('/details/:id', controller.getDetailsbyid); // Changed to POST

// For projects
router.post('/projects_list', controller.getProjects); // Already POST
router.post('/projects_details', controller.getProjectsDetails); // Changed to POST

module.exports = router;
