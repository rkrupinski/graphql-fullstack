import { RequestHandler, Router } from "express";
import rateLimit from "express-rate-limit";
import { register } from "./register";
import { login } from "./login";
import { verifyAuth } from "./verifyAuth";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: { status: 429, message: "Too many requests" },
});

const auth = Router();

auth.post("/login", login);

auth.post("/register", limiter, register);

export { auth, verifyAuth };
