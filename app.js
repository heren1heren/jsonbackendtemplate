import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import './Passportjs/strategies.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRouter from './Routes/index.js';

//authenticate
import session from 'express-session'; 
import passport from 'passport';
import pool from './db/pool.js';


const { default: pgSession } = await import('connect-pg-simple');


// const pgSession = require('connect-pg-simple')(session); 

//---------------Configuration---------------------------
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));

//-------------- AUTHENTICATION ----------------
// const PGStore = pgSession(session); 

// app.use(
//   session({
//     store: new PGStore({
//       pool: pool, // Connection pool
//       tableName: 'session',
//     }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
//     // Insert express-session options here
//   })
// );

// app.use(passport.authenticate('session')); // jwt

//------------------- Global app.use(middlewares)---------
app.options('*', cors());
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //! change when deploy
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log('req.user:', req.user);
//   next();
// });

//------------------------------- Routes-------------------
app.use('/', indexRouter);

// ---------------------Debug&server listen---------------------------
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  res.status(err.status || 500).send(err);
});

app.listen(3000, () => console.log('app listening on port localhost:3000'));
