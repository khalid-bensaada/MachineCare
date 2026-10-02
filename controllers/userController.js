const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(userId){
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

