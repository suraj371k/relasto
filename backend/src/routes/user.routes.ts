import { Router } from "express";
import { getAgents, getProfile, login, logout, register } from "../controllers/user.controller";
import { authenticate } from "../middlewares/protected";

const router = Router()

router.post('/register' , register)
router.post('/login' , login)
router.post('/logout' , logout)
router.get('/my-profile' , authenticate , getProfile)
router.get('/agents' , authenticate , getAgents)

export default router;