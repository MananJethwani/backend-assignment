const Post = require("../models/posts");
const Comment = require("../models/comment");

const getPost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });

        if (post) {
            const comments = await Comment.find({ _id: { $in: post.comments } });
            return res.status(200).send({
                ...post,
                comments,
                created_at: post.createdAt
            });
        } else {
            return res.status(400).send("Invalid post id");
        }

    } catch (err) {
        return res.status(500).send("Internal server error");
    }
}

module.exports = getPost;