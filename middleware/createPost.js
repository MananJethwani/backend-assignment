const Post = require("../models/posts");
const User = require("../models/user");

const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (title && description) {
            const post = new Post({
                title: title,
                desc: description,
                created_by: req.user_id
            });

            await post.save();

            const user = User.findOne({ _id: req.user_id });
            user.posts.push(post._id);
            await user.save();

            return res.status(200).send({
                id: post._id,
                title,
                description,
                created_at: post.createdAt
            });
        } else {
            return res.status(400).send("Incomplete or invalid input")
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

module.exports = createPost;