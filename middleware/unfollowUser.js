const User = require('../models/user');

const unfollowUser = async (req, res) => {
    try {
        if (req.user_id === req.params.id) {
            return res.status(400).send("can't unfollow yourself");
        }

        const user = await User.findOne({ _id: req.user_id });
        const user_to_follow = await User.findOne({ _id: req.params.id });

        if (user && user_to_follow) {
            if (!user.following.includes(req.params.id)) {
                return res.status(200).send("User already unfollowed");
            }

            user.following.remove(req.params.id);
            user_to_follow.followers_count--;

            await user.save();
            await user_to_follow.save();

            return res.status(200).send("User unfollowed");
        } else {
            return res.status(400).send("Invalid user id")
        }
    } catch (err) {
        return res.status(500).send("Internal server error")
    }
}

module.exports = unfollowUser;