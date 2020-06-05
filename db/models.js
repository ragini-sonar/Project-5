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
            // throw "Password should match";
            reject();
          }
        } else {
          if (result.length > 0) {
            //throw "User already registered";
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
          console.log("user not found");
          reject("Please register first");
        }
      });
    });
  },
};
