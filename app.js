require("dotenv").config();
const Express = require("express")
const app = Express()
const dbConnection = require("./db");
const controllers = require('./controllers');
// const upload = require("./middleware/multer");
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use(Express.json());

app.use(require('./middleware/headers'));

app.use("/products", controllers.productController)

app.use("/user", controllers.userController)

app.use("/favorite", controllers.favoriteController)

// app.post("/productpic", upload.single("image"), (req, res) => {
//     console.log(req.file)
//     coverName = res.req.file.filename
//     res.send(productPic)
// })


//admin view
// app.use('/admin',(req,res) => {
//     res.send('Admin Page')
// })

// basic user view
// app.use('/role', (req,res => {
//     res.send('role')
// }))

// function setUser(req, res, next) {
//     const userId = req.body.userID
//     if (userId) {
//         req.user = users.find(user =>user.id === userId)
//     }
//     next()
// }

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