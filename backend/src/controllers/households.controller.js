import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db/pool.js';
import { generateDishQR } from '../services/qr.service.js';
import { getCurrentBillWindow } from '../services/billing.service.js';

export async function createHousehold(req, res) {
  const { dish_id, house_name, area, phone_optional } = req.body;

  if (!dish_id || !house_name) {
    return res.status(400).json({ message: 'dish_id and house_name are required' });
  }

  const query = `
    INSERT INTO households(id, dish_id, house_name, area, phone_optional)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [uuidv4(), dish_id, house_name, area || null, phone_optional || null];

  try {
    const { rows } = await pool.query(query, values);
    const qr = await generateDishQR(dish_id);
    return res.status(201).json({ household: rows[0], qr });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function listHouseholds(req, res) {
  const { search } = req.query;
  const values = [];
  let where = '';

  if (search) {
    values.push(`%${search}%`);
    where = `WHERE dish_id ILIKE $1 OR house_name ILIKE $1 OR area ILIKE $1`;
  }

  const query = `SELECT * FROM households ${where} ORDER BY created_at DESC;`;

  const { rows } = await pool.query(query, values);
  return res.json(rows);
}

export async function getHouseholdByDishId(req, res) {
  const { dishId } = req.params;
  const bill = getCurrentBillWindow();

  const householdResult = await pool.query('SELECT * FROM households WHERE dish_id = $1;', [dishId]);

  if (householdResult.rows.length === 0) {
    return res.status(404).json({ message: 'Household not found' });
  }

  const household = householdResult.rows[0];
  const paymentResult = await pool.query(
    `SELECT * FROM payments WHERE household_id = $1 AND month = $2 AND year = $3 LIMIT 1;`,
    [household.id, bill.month, bill.year]
  );

  const status = paymentResult.rows.length > 0 ? 'PAID' : 'PENDING';
  return res.json({ household, current_bill: bill, status });
}
