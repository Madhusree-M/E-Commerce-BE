const Product = require("../models/Product")

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}

const getProductById = async (req, res) => {
  try {

    const productId = Number(req.params.id);
    const product = await Product.findOne({ product_id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product Not Found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}


const createProduct = async(req,res) => {
    try{
        const {product_id,
                name,
                original_price,
                selling_price,
                category,
                ratings,
                description,
                image_url} = req.body;

        const product = await Product.create({
                product_id,
                name,
                description,
                original_price,
                selling_price,
                category,
                ratings,
                image_url})
        res.status(201).json(product)
    } 
    catch(err){
        res.status(400).json({error : err.message})
    }

    console.log(req.body);
}

const deleteProduct = async(req,res) => {
    try {
        const productId = Number(req.params.id);
    const deletedProduct = await Product.findOneAndDelete({product_id:productId});

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully",
      product: deletedProduct
    });

  } catch (err) {
    res.status(400).json({error: "Invalid product ID"});
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: productId },
      req.body,
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {getProducts, getProductById, createProduct, deleteProduct, updateProduct}