import {
  validateEmail as _validateEmail,
  validatePassword as _validatePassword,
} from "@shared/utils";
import { FieldValidator } from "formik";

export const composeValidators = (
  ...validators: FieldValidator[]
): FieldValidator => (value) =>
  validators.reduce(
    async (acc, curr) => (await acc) || curr(value),
    Promise.resolve() as Promise<string | void>
  );

export const validateEmail: FieldValidator = (value) =>
  value ? (_validateEmail(value) ? undefined : "Invalid email") : undefined;

export const validatePassword: FieldValidator = (value) =>
  value
    ? _validatePassword(value)
      ? undefined
      : "Invalid password"
    : undefined;

export const validateMinLength = (min: number): FieldValidator => (value) =>
  value
    ? value.length >= min
      ? undefined
      : `Needs to be at least ${min} characters`
    : undefined;

export const validateRequired: FieldValidator = (value) =>
  value ? undefined : "Required";
