const { Router } = require('express');
const validateUser = require("../middleware/validateUser");
const createPost = require("../middleware/createPost");
const getPost = require("../middleware/getPost");
const deletePost = require("../middleware/deletePost");

const router = new Router();

router.post("/", validateUser, createPost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);

module.exports = router;