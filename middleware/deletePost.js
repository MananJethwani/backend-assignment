const Post = require("../models/posts");
const User = require("../models/user");

const deletePost = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
        if (post) {
            for(let i=0; i<post.likedBy.length; i++) {
                const user = await User.findOne(post.likedBy[i]);
                user.liked_posts.remove(req.params.id);
                await user.save();
            }
            await Post.deleteOne({_id: req.params.id});
            return res.status(200).send("Post delted succesfully");
        } else {
            return res.status(200).send("Post already deleted");
        }
    } catch(err) {
        return res.status(500).send("Internal server error");
    }
}

module.exports = deletePost;