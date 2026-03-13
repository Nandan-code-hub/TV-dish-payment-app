import jwt from 'jsonwebtoken';
import { sendOtp, verifyOtp } from '../services/otp.service.js';

export function sendOtpController(req, res) {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ message: 'phone is required' });
  }

  const response = sendOtp(phone);
  return res.json({ message: 'OTP sent', debug: response });
}

export function verifyOtpController(req, res) {
  const { phone, otp } = req.body;

  if (!verifyOtp(phone, otp)) {
    return res.status(401).json({ message: 'Invalid OTP' });
  }

  const token = jwt.sign(
    { phone, role: phone.endsWith('0000') ? 'OWNER' : 'HOUSEHOLD' },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' }
  );

  return res.json({ token });
}
