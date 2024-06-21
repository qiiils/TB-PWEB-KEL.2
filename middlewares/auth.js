const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).redirect('/login');
  }
};

module.exports = auth;
