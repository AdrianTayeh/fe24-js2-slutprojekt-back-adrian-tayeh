import { Router } from "express";
import { addMember, getMembers } from "../controllers/membersController.js";

const router = Router();

router.post('/members', addMember);
router.get('/members', getMembers);

export default router;