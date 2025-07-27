import { Router } from "express";
import { addReview, getAllAgents, getProfile, login, logout, register } from "../controllers/user.controller";
import { authenticate } from "../middlewares/protected";

const router = Router()

router.post('/register' , register)
router.post('/login' , login)
router.post('/logout' , logout)
router.get('/my-profile' , authenticate , getProfile)
router.get('/agents' , authenticate , getAllAgents)
router.post('/agents/:agentId/review', authenticate, async (req, res, next) => {
	try {
		await addReview(req, res);
	} catch (err) {
		next(err);
	}
})

router.get('/agents/:agentId/review', authenticate, async (req, res, next) => {
	try {
		await addReview(req, res);
	} catch (err) {
		next(err);
	}
})


export default router;