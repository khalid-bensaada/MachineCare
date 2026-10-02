const jwt = require("jsonwebtoken");
const User = require("../models/User");

function generateToken(userId){
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

function formatUser(user){
    return { id: user._id, nom: user.nom, prenom: user.prenom, email: user.email };
}

async function signUp(data){
    const { nom, prenom, email, password } = data;

    const user = await User.create({ nom, prenom, email, password });

    return { token: generateToken(user._id), user: formatUser(user) };
}

async function login(email, password){
    const user = await User.findOne({ email });

    if(!user || !(await user.comparePassword(password))){
        return null;
    }

    return { token: generateToken(user._id), user: formatUser(user) };
}

async function getAllUsers(){
    return await User.find().select("-password");
}

async function getUserById(id){
    return await User.findById(id).select("-password");
}

async function updateUser(id, data){
    const user = await User.findById(id);

    if(!user){
        return null;
    }

    const { nom, prenom, email, password } = data;

    if(nom !== undefined) user.nom = nom;
    if(prenom !== undefined) user.prenom = prenom;
    if(email !== undefined) user.email = email;
    if(password !== undefined) user.password = password;

    await user.save();

    return formatUser(user);
}

async function deleteUser(id){
    return await User.findByIdAndDelete(id);
}

module.exports = { signUp, login, getAllUsers, getUserById, updateUser, deleteUser };