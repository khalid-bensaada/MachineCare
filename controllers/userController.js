const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(userId){
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

async function signUp(req ,res){

    try {
        const { nom, prenom, email, password } = req.body;

        const user = await User.create({ nom, prenom, email, password });

        const token = generateToken(user._id);

        res.status(201).json({
            message: "User created successfully",
            token,
            user: { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email }
        });
    }
    catch (error){

        if (error.code === 11000) {
            return res.status(409).json({ message: "Email already exists" });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Error creating user", error: error.message });
    }
}

async function login(req ,res){

    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            message: "Logged in successfully",
            token,
            user: { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email }
        });
    }
    catch (error){
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}

