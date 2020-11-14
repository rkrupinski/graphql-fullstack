import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Field, Form, Formik, FieldValidator, FormikHelpers } from "formik";
import { MsgType } from "../generated/graphql";
import {
  composeValidators,
  validateRequired,
  validateEmail as _validateEmail,
  validatePassword as _validatePassword,
} from "../utils";
import { useAuth } from "../auth/provider";
import { addMessage } from "../services/messages";
import { Msg } from "../components/Msg";
import { Loading } from "../components/Loading";

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

const initialValues: FormValues = {
  email: "",
  password: "",
  repeatPassword: "",
};

const validateEmail = composeValidators(validateRequired, _validateEmail);
const validatePassword = composeValidators(validateRequired, _validatePassword);
const validateRepeatPassword = (values: FormValues): FieldValidator => (
  value
) => (value !== values.password ? "Passwords must match" : undefined);

export const Register: React.FC = () => {
  const { loading, register } = useAuth();
  const { push } = useHistory();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(
    async (values: FormValues, _helpers: FormikHelpers<FormValues>) => {
      try {
        await register(values.email, values.password);
        addMessage(
          MsgType.Success,
          "Account successfully created. You can now log in."
        );
        push("/login");
      } catch (err) {
        setError(err.message);
      }
    },
    []
  );

  return (
    <>
      <h1>Register</h1>
      {error && <Msg type="error">{error}</Msg>}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, touched, values }) => (
          <Form noValidate autoComplete="off">
            <label htmlFor="email">Email address</label>
            <div />
            <Field
              id="email"
              name="email"
              type="email"
              validate={validateEmail}
            />
            <div />
            {touched.email && errors.email && (
              <Msg type="error">{errors.email}</Msg>
            )}
            <label htmlFor="password">Password</label>
            <div />
            <Field
              id="password"
              name="password"
              type="password"
              validate={validatePassword}
            />
            <div />
            {touched.password && errors.password && (
              <Msg type="error">{errors.password}</Msg>
            )}
            <label htmlFor="repeatPassword">Repeat password</label>
            <div />
            <Field
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              validate={validateRepeatPassword(values)}
            />
            <div />
            {touched.repeatPassword && errors.repeatPassword && (
              <Msg type="error">{errors.repeatPassword}</Msg>
            )}
            <br />
            <button type="submit" disabled={loading}>
              Register
            </button>
            <Loading visible={loading} inline />
          </Form>
        )}
      </Formik>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
  );
};
