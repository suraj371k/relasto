"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const protected_1 = require("../middlewares/protected");
const router = (0, express_1.Router)();
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
router.post('/logout', user_controller_1.logout);
router.get('/my-profile', protected_1.authenticate, user_controller_1.getProfile);
router.get('/agents', protected_1.authenticate, user_controller_1.getAllAgents);
router.post('/agents/:agentId/review', protected_1.authenticate, async (req, res, next) => {
    try {
        await (0, user_controller_1.addReview)(req, res);
    }
    catch (err) {
        next(err);
    }
});
router.get('/agents/:agentId/review', protected_1.authenticate, async (req, res, next) => {
    try {
        await (0, user_controller_1.addReview)(req, res);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
