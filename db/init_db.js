const mysql = require("mysql");
const config = require("./config");

const con = mysql.createConnection(config);

module.exports = function () {
  //create database
  //   con.query("CREATE DATABASE if not exists project5", function (err, result) {
  //     if (err) throw err;
  //     console.log("Database Connected");
  //   });

  // connect to database
  con.connect(function (err) {
    if (err) {
      console.log("Error connecting Data base... ");
    } else {
      console.log("Connected to database !!! ");

      // create user table
      let sql1 =
        "CREATE TABLE if not exists users (user_id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY (user_id))";
      con.query(sql1, function (err, result) {
        if (err) throw err;
        console.log("User table Connected");
      });

      // create rating table
      let sql2 =
        "CREATE TABLE if not exists ratings (id int AUTO_INCREMENT, movie_id VARCHAR(255), rating INT, user_id int, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (user_id))";
      con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("Rating table Connected");
      });
    }
  });
};
