import { Router } from 'express';
import { body, param } from 'express-validator';
import { addTask, assignTask, markTaskAsDone, removeTask, getTasks } from '../controllers/tasksController.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = Router();

router.post(
  '/tasks',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').isIn(['ux', 'frontend', 'backend']).withMessage('Invalid category'),
    validate,
  ],
  addTask
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

router.delete(
  '/tasks/:id',
  [param('id').isUUID().withMessage('Invalid task ID'), validate],
  removeTask
);

router.get('/tasks', getTasks);

export default router;