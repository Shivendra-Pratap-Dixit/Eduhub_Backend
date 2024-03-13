
const adminMiddleware = (req, res, next) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized - Admin access required' });
    }
    next();
  };
  
  module.exports = adminMiddleware;
  