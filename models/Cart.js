const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",required: true,
        unique : true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",required:true
            },
            quantity: {type: Number,required: true,min:1, default: 1}
        }
    ]
})

module.exports = mongoose.model("cart", cartSchema);