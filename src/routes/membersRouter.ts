import { Router } from 'express';
import { body } from 'express-validator';
import { addMember, getMembers } from '../controllers/membersController.js';
import { validate } from '../middleware/validationMiddleware.js';

const router = Router();

router.post(
  '/members',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('roles').isArray().withMessage('Roles must be an array'),
    body('roles.*').isIn(['ux designer', 'frontend developer', 'backend developer']).withMessage('Invalid role'),
    validate,
  ],
  addMember
);

router.get('/members', getMembers);

export default router;