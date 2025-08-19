import { Router } from 'express';
import * as authcontroller from '../controllers/authcontroller';
import { authenticateUser } from '../middleware/authmiddleware';


const router = Router();

router.post('/register', authcontroller.registerUser);
router.post('/login', authcontroller.loginUser);
router.get('/verify/:token', authcontroller.verifyUser);
router.post('/reset-password/:token', authcontroller.resetPassword);
router.post('/forgot-password', authcontroller.forgotPassword);
router.post('/logout', authcontroller.logoutUser);
router.get('/checkAuth',authenticateUser, authcontroller.checkAuth);
export default router;
