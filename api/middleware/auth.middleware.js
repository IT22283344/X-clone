export const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized You must be login" });
  }
  next();
};
