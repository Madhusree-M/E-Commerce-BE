const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const Wishlist = require("../models/Wishlist");

// we cant store passwords directly in db.. so we are creating a hashedPassword using bcrypt and storing it


const getUsers = async (req,res) => {
    const users = await User.find();
    if(users)
    {
        res.status(200).json(users);
    }
    else{
        res.status(404).json({error : "User Not Found"})
    }
}

const registerUser = async(req,res) => {
    try{

        const {email, password, name} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser)
        {
            res.status(400).json( {error : "User already exists!"})
            return;
        }

        // bcrypt.hash(password,10) => hash function applied 2^10 times

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({email,password : hashedPassword,name});
        
        res.status(201).json({message:"User created successfully"},user)
    }
    catch(err)
    {
        res.status(400).json({error:err.message})
    }
}


const loginUser = async(req,res) => {
    try{
        const {email , password} = req.body;
        const user = await User.findOne({email})

        if(!user)
        {
            res.status(404).json({error : "User not found"})
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswordCorrect)
        {
            res.status(404).json({error : "Invalid password"})
            return;
        }

        const token = jwt.sign(
            {id: user._id , email : user.email},
            process.env.SECRET_KEY,
            {expiresIn : process.env.JWT_EXPIRES_IN}
            
        )
        res.status(200).json({message : "Login successful",token,user})
    }
    catch(err)
    {
        res.status(400).json({error : err.message})
    }
}

const getMe = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const orders = await Order.find({ user: decoded.id });

    const wishlist = await Wishlist.findOne({ user: decoded.id });
    const wishlistCount = wishlist?.items?.length || 0;

    res.status(200).json({ user: { ...user._doc, wishlistCount }, orders });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { registerUser, getUsers, loginUser, getMe };