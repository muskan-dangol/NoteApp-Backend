import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

interface CustomRequest extends Request {
  userId?: string;
}

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.replace("Bearer ", "");
    const secretKey = process.env.SECRET || "defaultSecret";

    try {
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

      if (Date.now() >= (decodedToken.exp ?? 0) * 1000) {
        return res.status(403).json({ message: "Token has expired" });
      }

      req.userId = decodedToken.userId as string;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  return;
};
