const { application } = require("express");

require("dotenv").config();
requir

// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const streamifier = require('streamifier');

// cloudinary.config({
//     apiKey: 596617524244214,
//     apiSecretKey: process.env.api_secret,
//     cloudName: process.env.cloud_name,
//     })

// const Upload = multer({
// storage: new CloudinaryStorage({
  
//   cloudinary: cloudinary,
//   params: {
//     folder: "JuleesResinShack",
//   },
//   key: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })
// })

// bucket: process.env.BUCKET_NAME,
// acl: 'public-read',
// metadata: function (req, file, cb) {
//     console.log(req.body)
//     cb(null, {fieldName: file.fieldname})
// },
// key: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname)
// }
// })
// })
application.post("/single", upload.single("image"), (req, res) =>
{
    
})
module.exports = Upload
