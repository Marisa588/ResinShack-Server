const Express = require("express");
const router = Express.Router();
const { ProductModel } = require("../models");
const Product = require("../models/product");
const validateJWT = require("../middleware/validate-jwt");


// show all products 
router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.findAll()
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({error: err});
    }
})
//get favorite
// router.get("/favorite", validateJWT, async (req, res) => {
//     const { id } = req.user;
    
//     try {
//         const userProducts = await ProductModel.findAll({
//             where: {
//                 owner_id: id
//             }
//         });
//         res.status(200).json(userProducts);
//     } catch (err) {
//         res.status(500).json({ error: error });
//     }
// });




// post a product 
router.post('/', validateJWT, async (req, res) => {
    const { name, description, price, imageUrl, imageLink } = req.body.product;
    //const { id } = req.user;
    const productEntry = {
        name,
        description,
        price,
        imageUrl,
        imageLink,
        // owner_id
    }
    try {
        const newProduct = await ProductModel.create(productEntry);
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    ProductModel.create(productEntry)
});

// edit a product 
router.put("/update/:id", validateJWT, async (req, res) => {
    const { name, description, price, imageUrl, imageLink } = req.body.product;
    const productId = req.params.id;
    // const { id } = req.user;

    const query = {
        where: {
            id: productId
        }
    };

    const updatedProduct = {
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        imageLink: imageLink
    };
    try {
        const update = await ProductModel.update(updatedProduct, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// delete a product
router.delete("/:id", validateJWT, async (req, res) => {
    const productId = req.params.id;
    //const { id } = req.user;
    try {
        const query = {
            where: {
                id: productId
            }
        }
        await ProductModel.destroy(query);
        res.status(200).json({ message: "Product removed." })
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;