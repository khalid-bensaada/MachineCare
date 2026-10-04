const User = require("../models/User");

async function createDefaultUser(){
    const count = await User.countDocuments();

    if(count > 0){
        return;
    }

    await User.create({
        nom: process.env.DEFAULT_USER_NOM || "Admin",
        prenom: process.env.DEFAULT_USER_PRENOM || "Admin",
        email: process.env.DEFAULT_USER_EMAIL || "admin@example.com",
        password: process.env.DEFAULT_USER_PASSWORD || "admin123"
    });
}

module.exports = createDefaultUser;