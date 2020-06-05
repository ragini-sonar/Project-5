var express = require("express");
var router = express.Router();
const models = require("../db/models");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  models.User.userLogin(email, password)
    .then(function (auth_token) {
      if (auth_token) {
        console.log("login successful");
        res.cookie("AuthToken", auth_token);
        res.redirect("/");
      } else {
        res.render("login");
      }
    })
    .catch((msg) => {
      res.render("registration", {
        messageClass: "alert-danger",
        message: msg,
      });
    });
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

router.get("/logout", (req, res) => {
  unsetAuthToken(req, res);
  res.redirect("/");
});

module.exports = router;
