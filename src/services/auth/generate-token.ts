import jsonwebtoken from "jsonwebtoken";
import { Response } from "express";

const maxAge = 86400000 * 1; // 1 days

// Signs and sets the JWT token in a httpOnly cookie
const generateTokens = (id: string, res: Response) => {
  const CSRFToken = Math.random().toString(36).slice(2);
  const tokenData = {
    id: id,
  };
  const token = jsonwebtoken.sign(tokenData, process.env.SECRET_KEY as string, {
    expiresIn: "1d",
  });
  const authToken = `${CSRFToken}::${token}`;
  res.cookie("authToken", authToken, {
    maxAge,
    httpOnly: true,
    signed: true,
    sameSite: "lax",
    secure: true,
  });
  return {
    CSRFToken,
  };
};

export default generateTokens;
