import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/user.controller";
import { authenticate } from "../middlewares/protected";

const router = Router()

router.post('/register' , register)
router.post('/login' , login)
router.post('/logout' , logout)
router.get('/my-profile' , authenticate , getProfile)

export default router;