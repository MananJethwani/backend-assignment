const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    likedBy: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    created_by: {
        type: String,
        rtequired: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);