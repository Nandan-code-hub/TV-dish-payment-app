const otpStore = new Map();

export function sendOtp(phone) {
  const otp = '123456';
  otpStore.set(phone, otp);
  return { phone, otp, expiresInSec: 300 };
}

export function verifyOtp(phone, otp) {
  const stored = otpStore.get(phone);
  if (!stored || stored !== otp) {
    return false;
  }
  otpStore.delete(phone);
  return true;
}
