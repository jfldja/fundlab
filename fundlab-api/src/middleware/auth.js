import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "缺少登入憑證" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: "登入憑證無效或已過期" });
  }
}
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "缺少登入憑證" });
    }

    if (!allowedRoles.includes(req.user.globalRole)) {
      return res.status(403).json({ error: "沒有權限執行此操作" });
    }

    next();
  };
}