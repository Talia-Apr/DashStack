import express from "express";
import { Login, Logout, Me } from '../controllers/AuthController.js';
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

// Token
router.get('/token', refreshToken);

// Me
router.get('/me', Me);

// Login
router.post('/login', Login);

// Logout
router.delete('/logout', Logout);

export default router;