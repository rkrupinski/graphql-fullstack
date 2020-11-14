import { RequestHandler } from "express";
import { DBUser } from "@shared/domain";
import { get } from "@shared/http";
import { mkJWT, verifyPassword } from "./utils";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await get<DBUser[]>(`${process.env.DB_API_URL}/users`);
    const user = users.find((u) => u.email === email);

    if (!user || !(await verifyPassword(password, user.password)))
      throw {
        status: 400,
        message: "Invalid email or password",
      };

    const token = await mkJWT(user);

    res.json({ token });
  } catch (err) {
    next(err);
  }
};
