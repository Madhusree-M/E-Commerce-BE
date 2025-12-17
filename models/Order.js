const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: Number,
      required: true,
      unique: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },

    items: [
      {
        product_id: {
          type: Number,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        image_url: {
          type: String
        }
      }
    ],

    total_items: {
      type: Number,
      required: true
    },

    total_amount: {
      type: Number,
      required: true
    },

    payment_method: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      required: true
    },

    payment_status: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING"
    },

    order_status: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED"
    },

    delivery_address: {
      name: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String
    },

    ordered_at: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
