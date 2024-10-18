const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,       
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Set up storage for Multer to upload files to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'your-folder-name',  // Replace with the folder name where images will be stored
    allowedFormats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Optional image transformation
  },
});

// Multer middleware for handling image uploads
const upload = multer({ storage: storage });
