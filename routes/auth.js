const { Router } = require('express');
const validateCredentials = require('../middleware/validateCredentials');
const userAuth = require("../middleware/authenticate");

const router = Router();

router.post('/', validateCredentials, userAuth);

module.exports = router;
