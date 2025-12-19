const express = require("express")
const fs = require("fs")
const mongoose = require("mongoose");
const cors = require("cors")
require ("dotenv").config()

const createDB = require("./config/db")
createDB();

const app = express()

const productsRouter = require("./routes/products")
const cartRouter = require("./routes/cart")
const authRouter = require("./routes/auth")
const orderRouter = require("./routes/order")
const wishlistRouter = require("./routes/wishlist")

app.get("/",(req,res) => {
    res.json({message : "Hello Express!"});
});

app.use(cors())
app.use(express.json())

app.use('/products',productsRouter)
app.use('/cart',cartRouter)
app.use('/auth',authRouter)
app.use('/orders',orderRouter)
app.use('/wishlist',wishlistRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})