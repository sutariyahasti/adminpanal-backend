// const multer = require('multer');
// const path = require('path');

// // Define storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     // Use original file extension
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   }
// });

// // Create multer instance with storage and file filter
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Only images are allowed'));
//   }
// });

// module.exports = upload;

const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where the files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename with timestamp
  }
});

// File filter to validate image uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

module.exports = upload;

