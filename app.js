require("dotenv").config();
const Express = require("express")

const app = Express()
const dbConnection = require("./db");
const controllers = require('./controllers');
// const Upload = require("./middleware/multer");
const cloudinary = require("cloudinary").v2;
console.log(cloudinary.config().cloud_name);
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const streamifier = require('streamifier');

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(Express.json());

const fileUpload = multer()

app.use(require('./middleware/headers'));

app.use("/products", controllers.productController);

app.use("/user", controllers.userController);

app.use("/favorite", controllers.favoriteController);

app.post('/upload', fileUpload.single('imageUrl'), function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
    async function upload(req) {
        let result = await streamUpload(req);
        console.log(result)
    }
    upload(req)
})
// app.post("/imageUrl", upload.single("imageUrl"), (req, res) => {
//     console.log(req.file);
//     productName = res.req.file.filename
//     res.send(productName);
// });

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