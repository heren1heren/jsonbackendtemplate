import { Router } from 'express';
import 'dotenv/config';
import passport from 'passport';
// import * as controller from '../../Controllers/index.js';

const index = Router();
const array = [];

//*GET
index.get('/', controller.indexGet);

//*POST

//*DELETE

//*UPDATE

index.get('/', (req, res) => {
  res.json({ name: 'frodo' });
});

index.get('/test', (req, res) => res.json({ array }));

index.post('/test', (req, res) => {
  array.push(req.body.item);
  res.send('success!');
});

export default index;
