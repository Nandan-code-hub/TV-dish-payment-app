import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import householdRoutes from './routes/households.routes.js';
import paymentRoutes from './routes/payments.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'dishpay-backend' });
});

app.use('/auth', authRoutes);
app.use('/households', householdRoutes);
app.use('/payments', paymentRoutes);
app.use('/owner/dashboard', dashboardRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`DishPay backend running on ${port}`);
});
