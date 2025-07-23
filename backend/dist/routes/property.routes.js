"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = require("../controllers/property.controller");
const protected_1 = require("../middlewares/protected");
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
// Wrap async handler to catch errors and pass to next()
function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
router.post('/upload', protected_1.authenticate, protected_1.isAgent, upload_1.upload.array('images'), asyncHandler(property_controller_1.uploadPropertyImage));
router.post('/create', protected_1.authenticate, protected_1.isAgent, asyncHandler(property_controller_1.createProperty));
router.get('/all', asyncHandler(property_controller_1.getAllProperties));
router.get('/:id', asyncHandler(property_controller_1.getPropertyById));
router.delete("/:id", protected_1.isAgent, asyncHandler(property_controller_1.deleteProperty));
router.put('/:id', protected_1.isAgent, asyncHandler(property_controller_1.updateProperty));
router.get('/agent/:agentId', protected_1.isAgent, asyncHandler(property_controller_1.getAgentProperties));
router.get("/suggested", asyncHandler(property_controller_1.getSuggestedProperties));
router.put('/status/:id', protected_1.isAgent, asyncHandler(property_controller_1.updatePropertyStatus));
exports.default = router;
