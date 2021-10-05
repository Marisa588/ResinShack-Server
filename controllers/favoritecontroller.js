const Express = require("express");
const router = Express.Router();
const { FavoriteModel } = require("../models");
const favorite = require("../models/favorite");
const validateJWT = require("../middleware/validate-jwt");

// get fave posts
router.get("/", validateJWT, async (req, res) => {
  const { id } = req.user;

  try {
    const favoriteProducts = await FavoriteModel.findAll({
      where: {
        owner_id: id,
      },
    });
    res.status(200).json(favoriteProducts);
  } catch (err) {
    res.status(500).json({ error: error });
  }
});

// post a product
router.post("/", validateJWT, async (req, res) => {
  const { name, description, price, imageUrl, imageLink } = req.body.favorite;
  const { id } = req.user;
  const favoriteEntry = {
    name,
    description,
    price,
    imageUrl,
    imageLink,
    owner_id: id,
  };
  try {
    const newFavorite = await FavoriteModel.create(favoriteEntry);
    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// delete a product
router.delete("/:id", validateJWT, async (req, res) => {
  const productId = req.params.id;
  //const { id } = req.user.favorite;
  try {
    const query = {
      where: {
        id: productId,
      },
    };
    await FavoriteModel.destroy(query);
    res.status(200).json({ message: "Product removed." });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
