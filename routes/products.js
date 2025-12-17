const express = require("express");
const router = express.Router();
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("../controllers/productController")

//get
router.get("/", getProducts);

// get by id
router.get("/:productId", getProductById);


router.post("/", createProduct);

router.delete("/:id",deleteProduct)


// put
// UPDATE product by product_id
router.put("/:id", updateProduct);


module.exports = router;




// ========================= file system
// const express = require("express");
// const fs = require("fs");
// const router = express.Router();


// router.get('/',(req,res)=>{
//     const products = fs.readFileSync("data/products.json")
//     res.json(JSON.parse(products));
// })

// router.get("/:id",(req,res) => {
//     console.log(req.params.id);

//     const products = fs.readFileSync("data/products.json")
//     const productsJSON = JSON.parse(products)

//     const product = productsJSON.find((prod) => {
//         return prod.id === parseInt(req.params.id)
//     })

//     if(product === undefined)
//     {
//         res.status(404).json({error : "Product Not Found"})
//     }else{
//         res.json(product)
//     }
// })


// router.delete('/:id',(req,res) => {
//     const products = fs.readFileSync("data/products.json")
//     const updatedProducts = JSON.parse(products).filter((p) => {
//         return p.id !== parseInt(req.params.id)
//     })

//     fs.writeFileSync('data/products.json',JSON.stringify(updatedProducts,null,2));
//     res.json({message : "Product deleted successfully!!"})
// })


// router.post('/',(req,res) => {
//     const products = JSON.parse(fs.readFileSync("data/products.json"))
//     const newProduct = {
//         id: products[products.length - 1].id + 1,
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         image: req.body.image,
//     }

//     const updatedProducts = [...products,newProduct];
//     fs.writeFileSync('data/products.json',JSON.stringify(updatedProducts,null,2))
//     res.status(201).json({message : "Product created successfully"});
// })

// // EDIT

// router.post("/edit/:id",(req,res) => {

//     const products = JSON.parse(fs.readFileSync("data/products.json"))

//     const id = parseInt(req.params.id);
//     const {name, description , price, image} = req.body;

//      const index = products.findIndex((p) => 
//         {
//             return p.id === id;
//         });

//     if(index === -1)
//         return res.status(404).json({message : "Product Not Found"})

//     products[index] = {id, name, price, description, image }
//     fs.writeFileSync("./data/products.json",JSON.stringify(products,null,2))
//     res.json({ message: "Product updated", product: products[index] });
// })

// module.exports = router;