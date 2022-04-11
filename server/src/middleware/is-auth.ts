import MESSAGES from "../constans/constans"
import express, { Request, Response, NextFunction } from "express"

import jwt  from 'jsonwebtoken';
import dotenv  from "dotenv"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

 const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // const authHeader = req.get('Authorization');
  // if (!authHeader) {
  //   const error = new Error('Not authenticated.');
  //   error.statusCode = 401;
  //   throw error;
  // }
  // const token = authHeader.split(' ')[1];
  // let decodedToken;
  // try {
  //   decodedToken = jwt.verify(token, JWT_SECRET);
  // } catch (err) {
  //   err.statusCode = 500;
  //   throw err;
  // }
  // if (!decodedToken) {
  //   const error = new Error('Not authenticated.');
  //   error.statusCode = 401;
  //   throw error;
  // }
  // req.userId = decodedToken.userId;
  next();
};

export default isAuth