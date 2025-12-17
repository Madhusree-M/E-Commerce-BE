const express = require("express");
const Cart = require("../models/Cart")
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {getCartItems, deleteCartItem, createCartItem} = require("../controllers/cartController")

router.get("/", authMiddleware, getCartItems);


// router.delete('/:id',(req,res) => {
//     const cartProducts = fs.readFileSync("data/cart.json")
//     const updatedCartProducts = JSON.parse(cartProducts).filter((c) => {
//         return c.id !== parseInt(req.params.id)
//     })

//     fs.writeFileSync('data/products.json',JSON.stringify(updatedCartProducts,null,2));
//     res.json({message : "Product removed successfully!!"})
// })


router.delete("/:productId",authMiddleware, deleteCartItem);

router.post("/",authMiddleware, createCartItem);

module.exports = router;