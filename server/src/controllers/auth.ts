import express, { Request, Response, NextFunction } from 'express'

import { validationResult }  from 'express-validator'
import User from "../models/user";
import bcrypt  from "bcryptjs";
 
import jwt  from "jsonwebtoken"
import dotenv  from "dotenv"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const getLogin = (req: Request, res: Response, next: NextFunction) => {
  res.status(200);
  res.json({ data: 'ok' });
};

const getSignup = (req: Request, res: Response, next: NextFunction) => {
  res.status(200);
  res.json({ data: "getSignup ok" });
};

const postLogin = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser: any;

  User.findOne({ email: email })
    .then((user: any) => {
      if (!user) {
        const error: any = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error: any = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }

      const token: any = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        JWT_SECRET!,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const postSignup = (req: Request, res: Response, next: NextFunction) => {
  const errors: any = validationResult(req);
  if (!errors.isEmpty()) {
    const error: any = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export default {
  getLogin,
  postSignup,
  postLogin,
  getSignup,
}
