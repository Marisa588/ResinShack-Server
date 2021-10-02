require("dotenv").config();
const Express = require("express")
const fileUpload = require('express-fileupload');
const app = Express()
const dbConnection = require("./db");
const controllers = require('./controllers');
const Upload = require("./middleware/multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(Express.json());

//cloudinary config
// cloudinary.config({
//     cloud_name: "drmnu8rm5",
//     api_key: "596617524244214",
//     api_secret: "7MI_fP22N1WlaI3VuKgc8DQW2es"
// })

// places images in folder
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: "DEV",
//     },
//   });
  const fileStorageEngine = multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, './TestImages')
      },
      filename: (req, file, cb) => {
          cb(null, Date.now() + "--" + file.originalname)
      },
  });
//   where images are kept
  const upload = multer({ storage: fileStorageEngine });


app.use(require('./middleware/headers'));

app.use("/products", controllers.productController);

app.use("/user", controllers.userController);

app.use("/favorite", controllers.favoriteController);

app.post("/imageUrl", upload.single("imageUrl"), (req, res) => {
    console.log(req.file);
    productName = res.req.file.filename
    res.send(productName);
});

// app.post("/productpic", upload.single("image"), (req, res) => {
//     console.log(req.file)
//     coverName = res.req.file.filename
//     res.send(productPic)
// })


dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3001, () => {
        console.log(`[Server]: App is listening on 3001.`);
    });
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
})