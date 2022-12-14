const { Router } = require("express");
const adminController = require("../controllers/adminControllers");
const requireAuth = require("../middlewares/requireAuth");
const { isAdmin } = require("../middlewares/`checkUser");

// create router object

const router = Router();

router.get("/signup", adminController.signup_admin_get);
router.post("/signup", adminController.signup_admin_post);

router.get("/login", adminController.login_admin_get);
router.post("/login", adminController.login_admin_post);

// admin dashboard route
router.get("/admin", requireAuth, isAdmin, (req, res) => {
  res.render("admin/admin");
});

// add new product route
router.get("/new-product", (req, res) => {
  res.render("admin/new-product");
});

module.exports = router;
