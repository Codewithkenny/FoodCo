const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tokenKey = process.env.TOKEN_KEY;
const maxAge = 3 * 24 * 60 * 60;
// function to create json web token

const createToken = (id) => {
  const token = jwt.sign({ id }, tokenKey, {
    expiresIn: maxAge,
  });
  return token;
};

module.exports.signup_admin_get = (req, res) => {
  res.render("admin/signup");
};
module.exports.signup_admin_post = async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.create({
    username,
    password,
  });
  // create token
  const token = createToken(admin._id);

  // send to client side
  res.cookie("jwt", token, { httpOnly: true, expiresIn: maxAge });
  res.redirect("/admin");
};

module.exports.login_admin_get = (req, res) => {
  res.render("admin/login");
};

module.exports.login_admin_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      //   const auth = bcrypt.compare(password, user.password);
      if (password === admin.password) {
        // create token
        const token = createToken(admin._id);

        // send to client side
        res.cookie("jwt", token, { httpOnly: true, expiresIn: maxAge });
        res.status(200).redirect("/admin");
      } else {
        res.status(401).json({
          message: "error in password",
        });
      }
    }
  } catch (error) {
    res.status(401).json({
      message: "error in login details",
    });
  }

  //   res.redirect("/admin/login");
};
