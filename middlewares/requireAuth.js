const jwt = require("jsonwebtoken");
const Admin = require("../controllers/adminControllers");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if token exist
  if (token) {
    // verify token
    jwt.verify(token, "Secret token string", (err, decodedToken) => {
      // if verificatio fails
      next();
    });
  }
};

module.exports = requireAuth;
