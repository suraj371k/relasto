import { Router } from "express";
import {
  getAllAgents,
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
router.get("/agents", authenticate, getAllAgents);


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
