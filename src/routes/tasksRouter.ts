import { Router } from "express";
import { addTask, assignTask, markTaskAsDone, removeTask, getTasks } from "../controllers/tasksController.js";

const router = Router();

router.post('/tasks', addTask);
router.patch('/tasks/:id/assign', assignTask);
router.patch('/tasks/:id/done', markTaskAsDone);
router.delete('/tasks/:id', removeTask);
router.get('/tasks', getTasks);

export default router;