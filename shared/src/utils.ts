import { validate as validateEmail } from "email-validator";
import PasswordValidator from "password-validator";
import { v4 } from "uuid";
import { ID } from "./domain";

export { validateEmail };

const pwdSchema = new PasswordValidator();

// prettier-ignore
pwdSchema
  .is().min(8)
  .is().max(100)
  .has().uppercase(1)
  .has().lowercase(1)
  .has().digits(1)
  .has().not().spaces();

export const validatePassword = (password: any) => pwdSchema.validate(password);

export const mkId = () => v4() as ID;
