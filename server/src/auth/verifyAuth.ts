import { RequestHandler } from "express";
import { JWT } from "@shared/domain";
import { verifyJWT } from "./utils";

export const verifyAuth: RequestHandler = async (req, res, next) => {
  try {
    const match = (req.headers.authorization || "").match(/^Bearer (.+)$/);
    if (!match) return next({ status: 401, message: "Missing token" });
    const [, token] = match;

    const decodedUser = await verifyJWT(token as JWT);

    req.user = decodedUser;
    next();
  } catch (err) {
    next({ status: 401, message: "Invalid token" });
  }
};
