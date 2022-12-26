var express = require('express');
var router = express.Router();

// Require post controller module.
const post_controller = require("../controllers/postController");

// GET home page and display all posts
// router.get("/list", post_controller.post_list);

// // GET request for creating a post
// router.get("/create", post_controller.post_create_get);

// POST request for creating a post
router.post("/create", post_controller.post_create_post);

// // GET request for deleting a post
// router.get("/:id/delete", post_controller.post_delete_get);

// POST request for deleting a post
router.post("/:id/delete", post_controller.post_delete_post);




module.exports = router;
