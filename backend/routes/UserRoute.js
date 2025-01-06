import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import upload from '../middleware/multerConfig.js';
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

// Get all users
router.get('/users', verifyToken, adminOnly, verifyUser, getUsers);

// Get user by id
router.get('/users/:id', verifyUser, adminOnly, getUserById);

// Create user
router.post('/users', verifyUser, adminOnly, createUser);

// Update user
router.patch('/users/:id', verifyUser, adminOnly, updateUser);

// Delete user
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);


export default router;