const express = require("express");
const { body } = require("express-validator/check");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", isAuth, authController.getSignup);

router.post("/login", authController.postLogin);

router.post(
  "/signup",
  isAuth,
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("confirmPassword").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.postSignup
);

module.exports = router;
