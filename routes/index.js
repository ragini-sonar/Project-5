var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  res.render("home", { title: "Pathé Gaumont cinemas" });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/registration", (req, res) => {
  res.render("registration");
});

router.get("/details/:id", function (req, res) {
  const { id } = req.params;
  res.render("details", {
    movieId: id,
  });
});

module.exports = router;
