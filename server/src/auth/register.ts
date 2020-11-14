import { RequestHandler } from "express";
import { DBUser } from "@shared/domain";
import { get, post } from "@shared/http";
import { validateEmail, validatePassword, mkId } from "@shared/utils";
import { mkHashedPassword } from "./utils";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validateEmail(email))
      throw {
        status: 400,
        message: "Invalid email",
      };

    if (!validatePassword(password))
      throw {
        status: 400,
        message: "Invalid password",
      };

    const users = await get<DBUser[]>(`${process.env.DB_API_URL}/users`);
    const exists = users.some((user) => user.email === email);

    if (!exists) {
      const hashed = await mkHashedPassword(password);

      const newUser: DBUser = {
        id: mkId(),
        email,
        password: hashed,
      };

      await post(`${process.env.DB_API_URL}/users`, {
        body: JSON.stringify(newUser),
      });
    }

    res.json({ message: "success" });
  } catch (err) {
    next(err);
  }
};
