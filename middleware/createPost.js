const Post = require("../models/posts");
const User = require("../models/user");

const createPost = async (req, res) => {
    try {
        const { Title: title, Description: description } = req.body;

        const oldPost = await Post.findOne({ title });
        if (oldPost) {
            return res.status(400).send("Post already exists");
        }

        if (title && description) {
            const post = new Post({
                title: title,
                desc: description,
                created_by: req.user_id
            });

            await post.save();

            const user = await User.findOne({ _id: req.user_id });
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