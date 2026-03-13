import { Router } from 'express';
import { ownerDashboard } from '../controllers/dashboard.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', requireAuth, ownerDashboard);

export default router;
