import { Router } from "express";
import { contactForm } from "../controllers/contact.controller";
const router = Router();

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/", asyncHandler(contactForm));

export default router;
