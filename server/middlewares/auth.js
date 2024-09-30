const jwt = require('jsonwebtoken');

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token." });
  }
};
