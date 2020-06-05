const crypto = require("crypto");
const cookieParser = require("cookie-parser");

// we store the tokens in-memory for simplicity's sake
// in production we'd make them persistent
const authTokens = {};

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

module.exports = {
  setAuthToken: (userId, res) => {
    // Store authentication token
    const authToken = generateAuthToken();
    // Setting the auth token in cookies
    authTokens[authToken] = userId;
    console.log(userId);
    return authToken;
  },

  unsetAuthToken: (current_token, res) => {
    delete authTokens[current_token];
    console.log("Logout success. User token deleted.");
  },

  getSessionUser: (req_token, res, next) => {
    return authTokens[req_token];
  },

  requireAuth: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      return res.status(401).redirect("/login");
    }
  },
};
