import { Router } from 'express';
import { createHousehold, getHouseholdByDishId, listHouseholds } from '../controllers/households.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', requireAuth, createHousehold);
router.get('/', requireAuth, listHouseholds);
router.get('/:dishId', getHouseholdByDishId);

export default router;
