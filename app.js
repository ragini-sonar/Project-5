const express = require("express");
const path = require("path");
const Router = require("./routes/index");
const db = require("./db/init_db");
const app = express();

db();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
