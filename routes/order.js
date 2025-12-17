const express = require("express")
const router = express.Router();
const {getOrders, placeOrder, getAllOrders} = require("../controllers/orderController")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/",authMiddleware,getOrders)

router.post("/",authMiddleware,placeOrder)

router.get("/all",getAllOrders)

module.exports = router;