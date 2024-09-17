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
router.get('/get', controller.getData);
router.get('/get/:id', controller.getDatabyid);
router.put('/update/:id', upload.single('file'), controller.updateData); // Updated to allow image upload on update
router.post('/delete/:id', controller.deleteData);
router.get('/details/:id', controller.getDetailsbyid);



module.exports = router;
