import { Router } from 'express';
import 'dotenv/config';
import User from '../prisma/user.js';
import passport from 'passport';
// import * as controller from '../../Controllers/index.js';

const index = Router();
const array = [];

//*GET

//*POST

//*DELETE

//*UPDATE

index.get('/', async (req, res) => {
    const users = await User.getUsers(req.query);
  res.json(users);
});

index.get('/test', (req, res) => res.json({ array }));

index.post('/test', (req, res) => {
  array.push(req.body.item);
  res.send('success!');
});

export default index;
