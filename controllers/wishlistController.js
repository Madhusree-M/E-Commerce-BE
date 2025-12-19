const Wishlist = require("../models/Wishlist")

const getWishlist = async (req, res) => {
  try{
  const wishlist = await Wishlist.findOne({ user: req.userData.id })
    .populate("items.product");

  if (!wishlist) {
    return res.status(200).json({ message: "Wishlist not found", items: [] });
  }

  res.status(200).json({ wishlist });
}
catch(err){
  res.json({error:err.message})
}

}

const deleteProduct = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.userData.id });

  wishlist.items = wishlist.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  await wishlist.save();
  res.json(wishlist);
}

const addProduct = async (req, res) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.userData.id });

  if (!wishlist) {
    wishlist = new Wishlist({
      user: req.userData.id,
      items: [{ product: productId }],
    });
  } else {
    const exists = wishlist.items.find(
      (item) => item.product.toString() === productId
    );

    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    wishlist.items.push({ product: productId });
  }

  await wishlist.save();
  res.json(wishlist);
}

module.exports = {getWishlist, deleteProduct, addProduct}