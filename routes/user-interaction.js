const { Router } = require('express');
const validateUser = require('../middleware/validateUser');
const followUser = require("../middleware/followUser");
const unfollowUser = require("../middleware/unfollowUser");
const getUser = require("../middleware/getUser");

const router = new Router();

router.post("/follow/:id", validateUser, followUser);
router.post("/unfollow/:id", validateUser, unfollowUser);
router.get("/user", validateUser, getUser);

module.exports = router;
