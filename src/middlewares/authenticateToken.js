const jwt = require('jsonwebtoken');
require('dotenv').config("../../.env");

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ statusCode: 401, message: 'Authorization header is required'});

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ statusCode: 401, message: 'Authorization header must be in the format Bearer <token>' });
  }

  const token = parts[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ statusCode: 403, message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
