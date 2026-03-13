import QRCode from 'qrcode';

export async function generateDishQR(dishId) {
  const payload = `dishpay://pay?house=${dishId}`;
  const dataUrl = await QRCode.toDataURL(payload);
  return { payload, dataUrl };
}
