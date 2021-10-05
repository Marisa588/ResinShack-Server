require("dotenv").config();
const Express = require("express")

const app = Express()
const dbConnection = require("./db");
const controllers = require('./controllers');
const cloudinary = require("cloudinary").v2;
console.log(cloudinary.config().cloud_name);

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



dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is listening on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
})