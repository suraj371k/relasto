import { Router } from "express";
import {
  createProperty,
  deleteProperty,
  getAgentProperties,
  getAllProperties,
  getPropertyById,
  updateProperty,
  updatePropertyStatus,
  uploadPropertyImage,
} from "../controllers/property.controller";

import { authenticate, isAgent } from "../middlewares/protected";
import { upload } from "../middlewares/upload";
const router = Router();

// Wrap async handler to catch errors and pass to next()
function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  "/upload",
  authenticate,
  isAgent,
  upload.array("images"),
  asyncHandler(uploadPropertyImage)
);

router.post("/create", authenticate, isAgent, asyncHandler(createProperty));

router.get("/all", asyncHandler(getAllProperties));

router.get("/:id", asyncHandler(getPropertyById));

router.delete("/:id", authenticate, isAgent, asyncHandler(deleteProperty));

router.put("/:id", authenticate, isAgent, asyncHandler(updateProperty));

router.get(
  "/agent/:agentId",
  authenticate,
  isAgent,
  asyncHandler(getAgentProperties)
);


router.patch(
  "/status/:id",
  authenticate,
  isAgent,
  asyncHandler(updatePropertyStatus)
);

export default router;
