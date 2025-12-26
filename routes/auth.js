const express = require("express")
const {registerUser, getUsers, loginUser, getMe} = require("../controllers/authController");

const router = express.Router();

// "/students"

router.post("/register", registerUser);
router.get("/",getUsers)
router.post("/login",loginUser)
router.get("/me", getMe);

module.exports = router; 