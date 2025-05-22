import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import indexRouter from './Routes/index.js';
import authRouter from './Routes/authRoutes.js';
//authenticate

import passport from 'passport';
import './Passport/JwtStrategies.js';



//---------------Configuration---------------------------
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'public')));

//-------------- AUTHENTICATION ----------------
app.use(passport.initialize());


//------------------- Global app.use(middlewares)---------
app.options('*', cors());
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //! change when deploy
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



//------------------------------- Routes-------------------
app.use('/', indexRouter);
app.use('/auth',authRouter);
// ---------------------Debug&server listen---------------------------
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);

  res.status(err.status || 500).send(err);
});

app.listen(3000, () => console.log('app listening on port localhost:3000'));
