var express = require("express");
var router = express.Router();
const models = require("../db/models");

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

router.post("/registration", (req, res) => {
  const { name, email, password, c_password } = req.body;
  models.User.addNewUser(name, email, password, c_password)
    .then(function (result) {
      res.render("login", {
        message: "Registration Complete. Please login to continue.",
        messageClass: "alert-success",
      });
    })
    .catch((msg) => {
      res.render("registration", {
        messageClass: "alert-danger",
        message: "Invalid inputs",
      });
    });
});

router.get("/details/:id", function (req, res) {
  const { id } = req.params;
  res.render("details", {
    movieId: id,
  });
});

module.exports = router;
