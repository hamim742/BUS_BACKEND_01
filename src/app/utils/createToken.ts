import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IJwtPayload } from "../interface/IJwtPayload";

export const createJwtToken = (
  payload: IJwtPayload,
  secret: Secret,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  } as SignOptions);
  return token;
};