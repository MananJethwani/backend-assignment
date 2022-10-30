const Post = require("../models/posts");
const User = require("../models/user");

const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user_id;

        const post = await Post.findOne({ _id: postId });
        const user = await User.findOne({ _id: userId });

        if (!post.likedBy.includes(user) && !user.liked_posts.includes(post)) {
            post.likedBy.append(user);
            user.liked_posts.append(post);
        } else {
            return res.status(400).send("invalid Id or post already liked");
        }
    } catch (err) {
        return res.status(500).send("Internal server error");
    }

}

module.exports = likePost;