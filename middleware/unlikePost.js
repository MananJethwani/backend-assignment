const Post = require("../models/posts");
const User = require("../models/user");

const unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user_id;

        const post = await Post.findOne({_id: postId});
        const user = await User.findOne({_id: userId});
    
        if (post.likedBy.includes(user) && user.liked_posts.includes(post)) {
            post.likedBy.remove(user);
            user.liked_posts.remove(post);
        } else {
            return res.status(400).send("invalid Id or post not yet liked");
        }
    } catch (err) {
        return res.status(500).send("Internal server error");
    }

}

module.exports = unlikePost;