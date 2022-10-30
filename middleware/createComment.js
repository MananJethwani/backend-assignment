const Comment = require("../models/comment");
const Post = require("../models/posts");

const createComment = async (req, res) => {
    try {
        const user_id = req.user_id;
        const post = await Post.findOne({ _id: req.params.id })
        const comment = req.body.comment;

        const postComment = new Comment({
            comment,
            commented_by: user_id
        });

        await postComment.save();
        post.comments.push(postComment._id);
        return res.status(200).send(postComment._id);

    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = createComment;