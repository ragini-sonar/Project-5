var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("home", { title: "Pathé Gaumont cinemas" });
});

module.exports = router;
