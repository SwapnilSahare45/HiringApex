import jwt, { JwtPayload } from "jsonwebtoken";

export function generateToken(sessionId: string, email: string, role: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing.");
  }
  const token = jwt.sign({ sessionId, email, role }, process.env.JWT_SECRET);
  return token;
}

export function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing.");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    return decode.sessionId;
  } catch (error) {
    console.log(error);
  }
}
