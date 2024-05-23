import { Router } from 'express';
import 'dotenv/config';
import passport from 'passport';
import * as controller from '../../Controllers/index.js';

const router = Router();

//*GET
router.get('/', controller.indexGet);

//*POST

//*Delete

//*Update

export default router;
