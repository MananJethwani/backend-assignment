const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateUser = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user_id = decoded.user_id;
    const user = await User.findOne({ _id: req.user_id });
    if (!user) {
      return res.status(401).send('Access denied. Invalid token.');
    }
    next();
  } catch (err) {
    res.status(401).send('Invalid token.');
  }
};

module.exports = validateUser;
