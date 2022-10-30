const mongoose = require("mongoose");

const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, "Please fill a valid email address"],
    },
    password: { type: String, required: true },
    following: {
        type: [String],
        default: []
    },
    followers_count: {
        type: Number,
        default: 0
    },
    posts: {
        type: [String],
        default: []
    },
    liked_posts: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model("User", userSchema);
