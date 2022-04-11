import express, { Request, Response, NextFunction } from "express"
import { body }  from "express-validator"
import authController  from "../controllers/auth"
import isAuth  from "../middleware/is-auth"
import User  from "../models/user"

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
      .custom((value: any, { req }: any) => {
        return User.findOne({ email: value }).then((userDoc: any) => {
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

export default router;
