const { Router } = require('express');
const validateUser = require('../middleware/validateUser');

const router = new Router();

router.post("/like/:id", validateUser);

module.exports = router;