const Post = require("../models/posts");

const createPost = async (req, res) => {
    try {
        const {title, desc} = req.body;
        if (title && desc) {
            const post = new Post({
                title: title,
                desc: desc,
            });
    
            await post.save();
    
            return res.status(200).send({
                id: post._id, 
                title, 
                desc,
                created_at: post.createdAt
            });
        } else {
            return res.status(400).send("Incomplete or invalid input")
        }
        
    } catch (err) {
        return res.status(500).send("Internal server error");
    }
}

module.exports = createPost;