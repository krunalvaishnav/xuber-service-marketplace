const jwt = require("jsonwebtoken");

const providerAuthMiddlewares = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log("auth header",authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token
//   console.log("provider_Auth_Middlewares_token:", token);

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token Immediately After Creation:", decoded);
    req.providerId = decoded.providerId;
    req.provider = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = providerAuthMiddlewares;
