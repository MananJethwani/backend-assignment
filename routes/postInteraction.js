const { Router } = require('express');
const validateUser = require('../middleware/validateUser');
const likePost = require('../middleware/likePost');
const unlikePost = require('../middleware/unlikePost');
const addComment = require("../middleware/createComment");

const router = new Router();

router.post("/like/:id", validateUser, likePost);
router.post("/unlike/:id", validateUser, unlikePost);
router.post("/comment/:id", validateUser, addComment);

module.exports = router;