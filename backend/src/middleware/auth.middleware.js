import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const token = auth.replace('Bearer ', '');

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
