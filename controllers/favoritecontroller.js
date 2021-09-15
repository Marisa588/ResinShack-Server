const Express = require("express");
const router = Express.Router();
const { FavoriteModel } = require("../models");
const Favorite = require("../models/favorite")
const validateJWT = require("../middleware/validate-jwt");


// get fave posts
router.get("/favorite", validateJWT, async (req, res) => {
    const { id } = req.user.favorite;
    
    try {
        const favoriteProducts = await FavoriteModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(favoriteProducts);
    } catch (err) {
        res.status(500).json({ error: error });
    }
});

// post a product 
router.post('/', validateJWT, async (req, res) => {
    const { name, description, price, imageUrl } = req.body.product;
    const { id } = req.user.favorite;
    const productEntry = {
        name,
        description,
        price,
        imageUrl,
        owner_id: id
    }
    try {
        const newProduct = await FavoriteModel.create(productEntry);
        res.status(200).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    FavoriteModel.create(productEntry)
});

// delete a product
router.delete("/:id", validateJWT, async (req, res) => {
    const productId = req.params.id;
    const { id } = req.user.favorite;
    try {
        const query = {
            where: {
                owner_id: id,
                id: productId
            }
        }
        await FavoriteModel.destroy(query);
        res.status(200).json({ message: "Product removed." })
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


module.exports = router;