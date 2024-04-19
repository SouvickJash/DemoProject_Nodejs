const jwt = require("jsonwebtoken");


const jwtAuth = (req, res, next) => {
  if (req.cookies && req.cookies.adminToken) {
    jwt.verify(req.cookies.adminToken, "souvikjash1234", (err, admin) => {
      req.admin = admin;
      next();
    });
  } else {
    next();
  }
};


module.exports = {
  jwtAuth
};
