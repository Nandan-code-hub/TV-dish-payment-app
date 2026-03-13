export function getCurrentBillWindow() {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    amount: Number(process.env.MONTHLY_BILL_AMOUNT || 320)
  };
}
