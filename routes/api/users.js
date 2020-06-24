const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../api/../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route GET api/users/
// @desc Get All Users
// @access Public
router.get("/", (req, res) => {
  User.find()
    .sort({ role: -1 })
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route POST api/users/
// @desc Register new user
// @access Public
router.post("/", (req, res) => {
  const { username, email, password, role, acceso } = req.body;

  // Simple validation
  if (!username || !email || !password || !role || !acceso) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User alredy exist" });

    const newUser = new User({
      username,
      email,
      password,
      role,
      acceso,
    });

    // Create salt $ hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  role: user.role,
                  acceso: user.acceso,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
