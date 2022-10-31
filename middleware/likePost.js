const Post = require("../models/posts");
const User = require("../models/user");

const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user_id;

        const post = await Post.findOne({ _id: postId });
        const user = await User.findOne({ _id: userId });

        if (!post.likedBy.includes(user._id) && !user.liked_posts.includes(post._id)) {
            post.likedBy.push(user._id);
            user.liked_posts.push(post._id);

            await post.save();
            await user.save();

            return res.status(200).send("Post liked");
        } else {
            return res.status(400).send("invalid Id or post already liked");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }

}

module.exports = likePost;