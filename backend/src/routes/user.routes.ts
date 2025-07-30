import { Router } from "express";
import {
  addReview,
  getAgentReviews,
  getAllAgents,
  getProfile,
  login,
  logout,
  register,
  updateAgentProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/protected";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/my-profile", authenticate, getProfile);
router.get("/agents", authenticate, getAllAgents);

router.post("/agents/:agentId/review", authenticate, async (req, res, next) => {
  try {
    await addReview(req, res);
  } catch (err) {
    next(err);
  }
});

router.get("/agents/:agentId/review", authenticate, async (req, res, next) => {
  try {
    await getAgentReviews(req, res);
  } catch (err) {
    next(err);
  }
});


router.put(
  "/agents/profile",
  authenticate,
  upload.single("image"),
  async (req, res, next) => {
    try {
      await updateAgentProfile(req, res);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
