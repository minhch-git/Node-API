import { Router } from "express";
import AuthCtrl from "../controllers/AuthCtrl";
import asyncHandler from '../middlewares/asyncHandler'
import { requiredLoggedIn } from '../middlewares/auth'
const router = new Router();

router.post('/register', asyncHandler(AuthCtrl.register))
router.post('/login', asyncHandler(AuthCtrl.login))
router.get('/me', requiredLoggedIn, asyncHandler(AuthCtrl.getMe))
router.post('/forgot-password', asyncHandler(AuthCtrl.forgotPassword))

export default router;
