const express = require("express");
const Router = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
