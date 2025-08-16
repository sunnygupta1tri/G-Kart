import { Router } from 'express';
import * as authcontroller from '../controllers/authcontroller';

const router = Router();

router.post('/register', authcontroller.registerUser);

export default router;
