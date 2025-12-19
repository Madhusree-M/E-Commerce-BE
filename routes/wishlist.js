const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const {getWishlist, deleteProduct, addProduct} = require("../controllers/wishlistController")

router.post("/add", authMiddleware, addProduct);


router.get("/", authMiddleware, getWishlist);

router.delete("/remove/:productId", authMiddleware, deleteProduct);


module.exports = router;
