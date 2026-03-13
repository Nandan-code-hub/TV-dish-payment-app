import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db/pool.js';
import { createRazorpayOrder, verifyRazorpaySignature } from '../services/payment.service.js';

export async function createOrder(req, res) {
  const { dish_id } = req.body;
  if (!dish_id) {
    return res.status(400).json({ message: 'dish_id is required' });
  }

  const order = await createRazorpayOrder(Number(process.env.MONTHLY_BILL_AMOUNT || 320));
  return res.json(order);
}

export async function verifyPayment(req, res) {
  const { dish_id, razorpay_order_id, razorpay_payment_id, razorpay_signature, month, year } = req.body;

  const isValid = verifyRazorpaySignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature
  });

  if (!isValid) {
    return res.status(400).json({ message: 'Invalid signature' });
  }

  const householdResult = await pool.query('SELECT id FROM households WHERE dish_id = $1;', [dish_id]);
  if (householdResult.rows.length === 0) {
    return res.status(404).json({ message: 'Household not found' });
  }

  const householdId = householdResult.rows[0].id;
  const query = `
    INSERT INTO payments(id, household_id, amount, month, year, payment_method, transaction_id, status)
    VALUES($1, $2, $3, $4, $5, 'UPI', $6, 'SUCCESS')
    ON CONFLICT (household_id, month, year)
    DO UPDATE SET transaction_id = EXCLUDED.transaction_id, status = EXCLUDED.status
    RETURNING *;
  `;

  const values = [uuidv4(), householdId, 320, month, year, razorpay_payment_id];
  const { rows } = await pool.query(query, values);

  return res.json({ message: 'Payment verified', payment: rows[0] });
}

export async function markCashPayment(req, res) {
  const { dish_id, month, year, amount } = req.body;

  const householdResult = await pool.query('SELECT id FROM households WHERE dish_id = $1;', [dish_id]);
  if (householdResult.rows.length === 0) {
    return res.status(404).json({ message: 'Household not found' });
  }

  const householdId = householdResult.rows[0].id;

  const query = `
    INSERT INTO payments(id, household_id, amount, month, year, payment_method, transaction_id, status)
    VALUES($1, $2, $3, $4, $5, 'CASH', $6, 'SUCCESS')
    ON CONFLICT (household_id, month, year)
    DO UPDATE SET amount = EXCLUDED.amount, payment_method = 'CASH', status = 'SUCCESS'
    RETURNING *;
  `;

  const values = [uuidv4(), householdId, amount || 320, month, year, `cash_${Date.now()}`];
  const { rows } = await pool.query(query, values);
  return res.json({ message: 'Cash payment marked', payment: rows[0] });
}

export async function paymentHistory(req, res) {
  const { dishId } = req.params;

  const query = `
    SELECT p.month, p.year, p.amount, p.payment_method, p.status, p.created_at
    FROM payments p
    JOIN households h ON h.id = p.household_id
    WHERE h.dish_id = $1
    ORDER BY p.year DESC, p.month DESC;
  `;

  const { rows } = await pool.query(query, [dishId]);
  return res.json(rows);
}
