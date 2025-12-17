const Cart = require("../models/Cart");
const Order = require("../models/Order");


// get orders

const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.userData.id })
    .populate("items.product_id");
  
  if (!orders) {
    return res.status(200).json({ message: "Orders not found", items: [] });
  }
  
  res.status(200).json({ orders });
}

const getAllOrders = async(req,res) => {
    const orders = await Order.find()
    if (!orders) {
    return res.status(200).json({ message: "Orders not found", items: [] });
  }
  
  res.status(200).json({ orders });
}

 // POST - Create / Place Order
 
const placeOrder = async (req, res) => {
  try {
    const {
      items,
      payment_method,
      delivery_address
    } = req.body;

    const lastOrder = await Order.findOne().sort({ createdAt: -1 });

    const order_id = lastOrder ? lastOrder.order_id+1 : 1
    // basic validation
    if ( !items || items.length === 0) {
      return res.status(400).json({
        message: "Missing required order details"
      });
    }

    // calculate totals
    let total_items = 0;
    let total_amount = 0;

    items.forEach(item => {
      total_items += item.quantity;
      total_amount += item.price * item.quantity;
    });

    const SHIPPING_CHARGE = 50;
total_amount += SHIPPING_CHARGE;

    // create order
    const newOrder = new Order({
      order_id,
      user:req.userData.id,
      items,
      total_items,
      total_amount,
      payment_method,
      delivery_address
    });

    const savedOrder = await newOrder.save();

    await Cart.updateOne(
  { user: req.userData.id },
  { $set: { products: [] } }
);


    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to place order",
      error: error.message
    });
  }
};


module.exports = { getOrders, placeOrder, getAllOrders }