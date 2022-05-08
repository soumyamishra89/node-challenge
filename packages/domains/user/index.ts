import authentication from './middleware/authentifcation';
import { router as login } from './routes/login';
import { Router } from 'express';
import { router as v1 } from './routes/v1-get-user';

export const router = Router();

router.use(login);
router.use(authentication);
router.use('/v1', v1);
