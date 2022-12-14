require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const tokenKey = process.env.TOKEN_KEY;

const verifyToken = (req) => {
  const token = req.cookies.jwt;

  //   verify token
  jwt.verify(token, tokenKey, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      // redirect to login
      res.redirect("/login");
    } else {
      return decodedToken;
    }
  });
};

const isAdmin = (req, res, next) => {
  // get id from dedoded token
  const id = verifyToken(req);

  //   find admin with decodedToken

  Admin.findById(id)
    .then((admin) => {
      // continue execution of route
      next();
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Access Denied, Not Authorized" });
    });
};

module.exports = {
  isAdmin,
};
