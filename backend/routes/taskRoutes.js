import express from 'express';
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/taskControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware, getAllTasks);
router.post("/create", authMiddleware,createTask);
router.put("/update/:id", authMiddleware,updateTask);
router.delete("/delete/:id", authMiddleware, deleteTask);

export default router;
