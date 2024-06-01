const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token not found.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    req.user = decoded;  // Add the decoded token data to req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Failed to authenticate token.' });
  }
};

module.exports = verifyToken;
