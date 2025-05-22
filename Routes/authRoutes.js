import 'dotenv/config';
import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import * as authController from '../Controllers/AuthCon.js';
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;
router.post('/register', authController.register);
router.post('/login', authController.login);
// Protected route example
router.get('/protected', 
  (req, res, next) => {
 console.log('authorization:',req.headers.authorization);
console.log("Decoded Token:", jwt.verify(req.headers.authorization.split(" ")[1], jwtSecret)); // jwt must be provided
next();
  },
  passport.authenticate('jwt', { session: false }), 
  authController.protectedRoute
);

export default router;