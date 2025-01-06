import express from "express";
import { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier } from "../controllers/SupplierController.js";
import { verifyUser, adminOnly, managerOnly } from "../middleware/AuthUser.js";
import upload from '../middleware/multerConfig.js';

const router = express.Router();

// Get all Supplier
router.get('/suppliers', verifyUser, adminOnly, managerOnly, getSuppliers);

// Get Supplier by id
router.get('/suppliers/:id', verifyUser, adminOnly, managerOnly, getSupplierById);

// Create Supplier
router.post('/suppliers', verifyUser, adminOnly, managerOnly, createSupplier);

// Update Supplier
router.patch('/suppliers/:id', verifyUser, adminOnly, managerOnly, updateSupplier);

// Delete Supplier
router.delete('/suppliers/:id', verifyUser, adminOnly, managerOnly, deleteSupplier);


export default router;