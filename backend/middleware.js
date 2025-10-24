const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //  Check if header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  try {
    //  Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    //  Check payload
    if (decoded && decoded.id) {
      req.user = decoded; // Attach user info
      next(); // Let user continue
    } else {
      return res.status(401).json({ message: "Invalid token" });
    }

  } catch (err) {
    // Catch invalid/expired tokens
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
