const Post = require("../models/posts");

const getPost = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id});
    
        if (post) {
            return res.status(200).send({
                id: post._id,
                title: post.title,
                desc: post.desc,
                Comments: post.comments,
                likes: post.likedBy.length,
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