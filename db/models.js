const mysql = require("mysql");
const config = require("./config");
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
};
