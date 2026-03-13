import { pool } from '../db/pool.js';

export async function ownerDashboard(req, res) {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const billAmount = Number(process.env.MONTHLY_BILL_AMOUNT || 320);

  const [totalHouses, paidHouses] = await Promise.all([
    pool.query('SELECT COUNT(*)::int AS count FROM households;'),
    pool.query('SELECT COUNT(DISTINCT household_id)::int AS count FROM payments WHERE month=$1 AND year=$2 AND status=$3;', [month, year, 'SUCCESS'])
  ]);

  const total = totalHouses.rows[0].count;
  const paid = paidHouses.rows[0].count;
  const pending = Math.max(total - paid, 0);

  return res.json({
    month,
    year,
    total_households: total,
    paid_households: paid,
    pending_households: pending,
    total_collected_amount: paid * billAmount
  });
}
