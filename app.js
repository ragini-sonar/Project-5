const express = require("express");
const path = require("path");
const Router = require("./routes/index");
const db = require("./db/init_db");
const hbs = require("express-handlebars");

const PORT = process.env.PORT || 8000;

const app = express();

db();

// view engine setup
app.engine(
  "hbs",
  hbs({
    layoutsDir: "views/layout",
    defaultLayout: "main",
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

//app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("Ajax"));

app.use(Router);

app.listen(PORT, console.log(`Server running on port ${PORT}`));