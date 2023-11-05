const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const token = req?.cookies?.token ?? req?.headers?.token
  if (!token) {
    return res.status(404).json({ message: 'No token found' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired. Please log in again' });
      }
      return res.status(400).json({ message: 'Invalid Token' });
    }

    req.id = user.id;
    next();
  });
};
 
module.exports = {
  verifyToken,
};
 