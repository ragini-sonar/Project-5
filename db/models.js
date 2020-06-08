const mysql = require("mysql");
const config = require("./config");
const auth = require("../routes/auth.js");
const con = mysql.createConnection(config);

module.exports.User = {
  addNewUser: (name, email, password, c_password) => {
    let sql = "SELECT * FROM users WHERE email = ?";

    return new Promise(function (resolve, reject) {
      con.query(sql, [email], function (err, result) {
        if (result.length == 0) {
          if (!name || !email || !password || !c_password) {
            throw "Fields cannot be empty!";
          }
          if (password === c_password) {
            let sql1 = "INSERT INTO users SET ?";
            let post = { name: name, email: email, password: password };
            con.query(sql1, post, function (err, result) {
              if (err) throw err;
              resolve(result);
            });
          } else {
            reject();
          }
        } else {
          if (result.length > 0) {
            reject();
          }
        }
      });
    });
  },

  userLogin: (email, pwd) => {
    let sql = "SELECT * FROM users WHERE email = ?";
    return new Promise(function (resolve, reject) {
      con.query(sql, [email], function (err, result) {
        if (result.length > 0) {
          if (result[0].password == pwd) {
            const auth_token = auth.setAuthToken(result[0].user_id);
            resolve(auth_token);
          } else {
            reject();
            return;
          }
        } else {
          reject();
        }
      });
    });
  },

  insertRating: (movieId, ratedIndex, userId) => {
    var found = false;
    let sql = "SELECT movie_id FROM ratings where user_id = ?";
    return new Promise(function (resolve, reject) {
      con.query(sql, [userId], function (err, result) {
        if (err) throw err;
        // if user id is not in rating table()
        if (result != undefined) {
          for (var record in result) {
            if (result[record].movie_id == movieId) {
              found = true;
            }
          }
        }
        // if user has not reted the movie already
        if (!found) {
          let sql1 = "INSERT INTO ratings SET ? ";
          let post = { movie_id: movieId, rating: ratedIndex, user_id: userId };
          con.query(sql1, post, (err, res1) => {
            if (err) throw err;
            resolve();
          });
        } else {
          reject();
        }
      });
    });
  },

  //getting average rating and users
  avgRating: (movie_id) => {
    let sql =
      "SELECT AVG(rating), COUNT(movie_id) FROM ratings WHERE movie_id = ?";
    return new Promise(function (resolve, reject) {
      con.query(sql, [movie_id], function (err, result) {
        if (err) throw err;
        resolve(result);
      });
    });
    reject();
  },
};
