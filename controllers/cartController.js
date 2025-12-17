const Cart = require("../models/Cart")

const getCartItems = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userData.id })
    .populate("products.product");
  
  if (!cart) {
    return res.status(200).json({ message: "Cart not found", cart: [] });
  }
  
  res.status(200).json({ cart });
}

const deleteCartItem = async(req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userData.id

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Product removed successfully!!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createCartItem = async (req, res) => {
  try {
    const userId = req.userData.id;
    const {productId, quantity } = req.body;

    console.log(userId, productId, quantity)

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: []
      });
    }

    const existingProduct = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: quantity || 1
      });
    }

    await cart.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {getCartItems, deleteCartItem, createCartItem}