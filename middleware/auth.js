const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect("/auth/login");
      // return res.status(401).send({ auth: false, message: 'Token not found.' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Gagal untuk melakukan verifikasi token.' });
      }
  
      req.userId = decoded.id;
      req.userRole = decoded.role; 
      req.userEmail = decoded.email;
      next();
    });


  }



  function isLogin(req, res, next) {
    const token = req.cookies.token;
  
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, function (err, decoded) {
        if (err) {
          return res
            .status(500)
            .send({
              auth: false,
              message: "Gagal untuk melakukan verifikasi token.",
            });
        }
  
        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.userEmail = decoded.email;
      });
      if (req.userRole == "user") {
        return res.redirect("/user");
      } else if (req.userRole == "admin") {
        return res.redirect("/admin/");
      }
    }
  
    next();
  }
  
  module.exports = isLogin;
  module.exports = verifyToken;