const express = require("express");
const router = express.Router();

const { auth } = require("../controllers/auth");
const {
  register_user,
  login_user,
  profile,
  logout,
} = require("../controllers/user.controller");

// adding new user (sign-up route)
router.post("/auth/register", register_user);

// login user
router.post("/auth/login", login_user);

// get logged in user
router.get("/auth/profile", auth, profile);

//logout user
router.get("/auth/logout", auth, logout);

module.exports = router;
