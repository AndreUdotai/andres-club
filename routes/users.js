var express = require('express');
var router = express.Router();

// Require user controller module.
const user_controller = require("../controllers/userController");

// GET request for creating a user
router.get("/create", user_controller.user_create_get);

// POST request for creating a user
router.post("/create", user_controller.user_create_post);

// GET request for login form
router.get("/login", user_controller.user_login_get);

// POST request for login form
router.post("/login", user_controller.user_login_post);

// GET request for logout
router.get("/logout", user_controller.user_logout);

// GET request for updating user membership status
router.get("/:id/membership/update", user_controller.user_membership_update_get);

// POST request for updating user membership status
router.post("/:id/membership/update", user_controller.user_membership_update_post);

// GET request for updating user admin status
router.get("/:id/admin/update", user_controller.user_admin_update_get);

// POST request for updating user adming status
router.post("/:id/admin/update", user_controller.user_admin_update_post);

module.exports = router;
