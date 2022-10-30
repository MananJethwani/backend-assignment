const Post = require("../models/posts");
const User = require("../models/user");
const Comment = require("../models/comment");

const deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if (post) {
            for (let i = 0; i < post.likedBy.length; i++) {
                const user = await User.findOne(post.likedBy[i]);
                user.liked_posts.remove(req.params.id);
                await user.save();
            }
            for (let i = 0; i < post.comments.length; i++) {
                await Comment.deleteOne({ _id: post.comments[i] });
            }
            await Post.deleteOne({ _id: req.params.id });
            return res.status(200).send("Post delted succesfully");
        } else {
            return res.status(200).send("Post already deleted");
        }
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
}

module.exports = deletePost;