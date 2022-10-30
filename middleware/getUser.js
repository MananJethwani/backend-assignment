const User = require('../models/user');

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.user_id });
        res.status(200).send({
            username: user.username,
            followers_count: user.followers_count,
            following_count: user.following.length
        })
    } catch (err) {
        res.status(500).send("Internal server error");
    }
}

module.exports = getUser;