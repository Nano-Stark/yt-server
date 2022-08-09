import express from "express";
import { register, signin, logout } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// CREATE USER
router.post("/register", register);
//SIGN IN
router.post("/signin", signin);
router.post("/logout", logout);
//GOOGLE AUTH_ROUTES
// router.post("/google", googleAuth);

export default router;
