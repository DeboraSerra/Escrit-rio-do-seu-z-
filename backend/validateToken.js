const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  if (token.length !== 16) return res.status(401).json({ message: 'Invalid token' });
  next();
};

module.exports = validateToken;
