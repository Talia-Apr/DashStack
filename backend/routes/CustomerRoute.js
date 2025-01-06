import express from "express";
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from "../controllers/CustomerController.js";
import upload from '../middleware/multerConfig.js';

const router = express.Router();

// Get all Customer
router.get('/customers', getCustomers);

// Get Customer by id
router.get('/customers/:id', getCustomerById);

// Create Customer
router.post('/customers', createCustomer);

// Update Customer
router.patch('/customers/:id', updateCustomer);

// Delete Customer
router.delete('/customers/:id', deleteCustomer);


export default router;