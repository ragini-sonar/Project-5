const express = require("express");
const router = express.Router();
const models = require("../db/models");
const { requireAuth, setAuthToken, unsetAuthToken } = require("./auth");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("home", {
    user: req.user,
  });
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

router.get("/logout", (req, res) => {
  unsetAuthToken(req.cookies["AuthToken"]);
  res.redirect("/");
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
    user: req.user,
    movieId: id,
  });
});

router.post("/saverating", requireAuth, (req, res) => {
  const { movie_id, rating } = req.body;
  console.log("user found: ", req.user);
  models.User.insertRating(movie_id, rating, req.user)
    .then(function (result) {
      console.log("back to save rating", result);
      res.send({
        messageClass: "alert-success",
        message: "Summited rating.",
      });
    })
    .catch((msg) => {
      console.log("back to save rating 1");
      res.send({
        messageClass: "alert-danger",
        message: "Already rated.",
      });
    });
});

module.exports = router;
