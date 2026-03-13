import { Router } from 'express';
import { createOrder, markCashPayment, paymentHistory, verifyPayment } from '../controllers/payments.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.post('/cash', requireAuth, markCashPayment);
router.get('/history/:dishId', requireAuth, paymentHistory);

export default router;
