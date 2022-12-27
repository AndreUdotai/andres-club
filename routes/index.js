var express = require('express');
var router = express.Router();

// Require post controller module.
const post_controller = require("../controllers/postController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/home");
});

router.get("/home", post_controller.post_list);

module.exports = router;
