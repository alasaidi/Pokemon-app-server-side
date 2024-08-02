import express from "express";
import playerController from "../controllers/player.controller.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/api", playerController.Register);
router.post("/api/login", playerController.login);
router.get("/api/logout", playerController.logout);

export default router;
