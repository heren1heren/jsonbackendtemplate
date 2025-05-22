import 'dotenv/config';
import { Strategy as JwtStrategy } from 'passport-jwt';

import { ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../prisma/models/user.js';

const opts = {jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET};


const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  console.log("jwt_payload:", jwt_payload);
  
  
  const user = await User.getUserById(jwt_payload.id); 
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
    // or you could create a new account
  }
});
passport.use(strategy);
