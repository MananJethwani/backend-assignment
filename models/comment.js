const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    commented_by: {
        type: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);
