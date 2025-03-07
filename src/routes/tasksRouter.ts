import { Router } from 'express';
import { body, param } from 'express-validator';
import { addTask, assignTask, markTaskAsDone, removeTask, getTasks, updateTaskPriority } from '../controllers/tasksController.js';
import { validate } from '../middleware/validationMiddleware.js';
import { TaskService } from '../services/TaskService.js';

const router = Router();

router.post(
  '/tasks',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').isIn(['ux', 'frontend', 'backend']).withMessage('Invalid category'),
    body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
    body('parentId').optional().isUUID().withMessage('Invalid parent task ID'),
    validate,
  ],
  addTask
);

router.patch(
  '/tasks/:parentId/subtasks',
  [
    param('parentId').isUUID().withMessage('Invalid parent task ID'),
    body('subtaskId').isUUID().withMessage('Invalid subtask ID'),
    validate,
  ],
  async (req, res, next) => {
    try {
      const { parentId } = req.params;
      const { subtaskId } = req.body;
      const taskService = new TaskService();
      const updatedParentTask = await taskService.updateParentTaskWithSubtask(parentId, subtaskId);
      res.status(200).json(updatedParentTask);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/tasks/:id/assign',
  [
    param('id').isUUID().withMessage('Invalid task ID'),
    body('memberId').isUUID().withMessage('Invalid member ID'),
    validate,
  ],
  assignTask
);

router.patch(
  '/tasks/:id/done',
  [param('id').isUUID().withMessage('Invalid task ID'), validate],
  markTaskAsDone
);

router.patch(
  '/tasks/:id/priority',
  [
    param('id').isUUID().withMessage('Invalid task ID'),
    body('priority').isIn(['low', 'medium', 'high']).withMessage('Invalid priority'),
    validate,
  ],
  updateTaskPriority
);

router.delete(
  '/tasks/:id',
  [param('id').isUUID().withMessage('Invalid task ID'), validate],
  removeTask
);

router.get('/tasks', getTasks);

export default router;