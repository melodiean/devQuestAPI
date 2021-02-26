const User = require("../models/user.model");

// register user
exports.registerUser = function (req, res) {
  // taking a user
  const newuser = new User(req.body);

  if (newuser.password != newuser.password2)
    return res.status(400).json({ message: "Password not Match!" });

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user)
      return res.status(400).json({ auth: false, message: "Email Exists!" });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false,
        error:err.message });
      }
      res.status(200).json({
        success: true,
        user: doc,
      });
    });
  });
};

// log user in
exports.loginUser = async (req, res) => {
  let token = req.cookies.auth;

  await User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user)
      return res.status(400).json({
        error:err.message,
        message: `${user.firstname} is logged in!`,
      });
    else {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        if (!user)
          return res.json({
            isAuth: false,
            message: "Auth failed ,email not found",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "Password doesn't match!",
            });

          user.generateToken((err, user) => {
            if (err) return res.status(400).json({msg:err.message});
            res.cookie("auth", user.token).json({
              isAuth: true,
              id: user._id,
              email: user.email            });
          });
        });
      });
    }
  });
};

// get user profile
exports.profile = function (req, res) {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: `${req.user.firstname} ${req.user.lastname}`,
  });
};

// log user out
exports.logout = function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).json({msg:err});
    res.status(200).json({msg:"Successfully Logged Out!"});
  });
};
