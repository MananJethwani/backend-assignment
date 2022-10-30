const User = require("../models/user");
const Post = require("../models/posts");
const Comment = require("../models/comment");

const getAllPosts = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user_id });
        if (!user) {
            return res.status(400).send("invalid user");
        }
        let postData = []
        for (let i = 0; i < user.posts.length; i++) {
            const post = await Post.findOne({ _id: user.posts[i] });
            const comments = await Comment.find({ _id: { $in: post.comments } });
            postData.push({
                ...post,
                comments: comments
            });
        }
        return res.status(200).send(postData);
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
}

module.exports = getAllPosts;