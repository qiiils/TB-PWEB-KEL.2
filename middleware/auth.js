const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.session.userId = decoded._id;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};