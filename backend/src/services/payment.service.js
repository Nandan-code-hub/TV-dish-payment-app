import crypto from 'crypto';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret'
});

export async function createRazorpayOrder(amountInRupees) {
  const order = await razorpay.orders.create({
    amount: amountInRupees * 100,
    currency: 'INR',
    receipt: `dishpay_${Date.now()}`
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID
  };
}

export function verifyRazorpaySignature({ orderId, paymentId, signature }) {
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret');
  hmac.update(`${orderId}|${paymentId}`);
  const digest = hmac.digest('hex');
  return digest === signature;
}
