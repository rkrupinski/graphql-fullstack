import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import omit from "lodash.omit";
import { DBUser, Hashed, JWT, User } from "@shared/domain";

const saltRounds = 10;

export const mkHashedPassword = async (password: string) =>
  (await bcrypt.hash(password, saltRounds)) as Hashed;

export const verifyPassword = (password: string, hash: Hashed) =>
  bcrypt.compare(password, hash);

export const mkJWT = (user: DBUser) =>
  new Promise<JWT>((resolve, reject) => {
    jwt.sign(
      omit(user, "password"),
      process.env.SECRET,
      { expiresIn: "30 days" },
      (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded as JWT);
        }
      }
    );
  });

export const verifyJWT = (token: JWT) =>
  new Promise<User>((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as User);
      }
    });
  });
