const User = require("./models/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


dotenv.config();

const registerUser = async ({ email, password, username }, ind) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email: email.toLowerCase(),
        password: encryptedPassword
    });
    console.log("user saved - ", email);
    await user.save();
    if (ind == 2) process.exit(0);
}

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("connected");
        [{
            username: "Manan",
            email: "mananjethwani@gmail.com",
            password: "abc"
        },
        {
            username: "michael",
            email: "mananjethwani1@gmail.com",
            password: "defg"
        },
        {
            username: "jhon",
            email: "mananjethwani2@gmail.com",
            password: "hijkl"
        },
        ].forEach(registerUser);
    })