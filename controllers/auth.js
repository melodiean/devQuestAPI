const User = require("../models/user.model");

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        error: "Not logged in!",
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
