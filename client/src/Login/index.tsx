import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { MsgType } from "../generated/graphql";
import { useAuth } from "../auth/provider";
import { addMessage } from "../services/messages";
import { MsgOutlet } from "../components/MsgOutlet";
import { Msg } from "../components/Msg";
import { Loading } from "../components/Loading";
import { validateRequired } from "../utils";

type FormValues = {
  email: string;
  password: string;
};

const initialValues: FormValues = {
  email: "",
  password: "",
};

export const Login: React.FC = () => {
  const { loading, login } = useAuth();
  const { push } = useHistory();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(
    async (values: FormValues, _helpers: FormikHelpers<FormValues>) => {
      try {
        await login(values.email, values.password);
        push("/app");
        addMessage(MsgType.Success, `Logged in as ${values.email}`);
      } catch (err) {
        setError(err.message);
      }
    },
    []
  );

  return (
    <>
      <MsgOutlet />
      <h1>Log in</h1>
      {error && <Msg type="error">{error}</Msg>}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form noValidate autoComplete="off">
            <label htmlFor="email">Email address</label>
            <div />
            <Field
              id="email"
              name="email"
              type="email"
              validate={validateRequired}
            />
            {touched.email && errors.email && (
              <Msg type="error">{errors.email}</Msg>
            )}
            <div />
            <label htmlFor="password">Password</label>
            <div />
            <Field
              id="password"
              name="password"
              type="password"
              validate={validateRequired}
            />
            <div />
            {touched.password && errors.password && (
              <Msg type="error">{errors.password}</Msg>
            )}
            <br />
            <button type="submit" disabled={loading}>
              Log in
            </button>
            <Loading visible={loading} inline />
          </Form>
        )}
      </Formik>
      <p>
        Don&apos;t have an account? <Link to="/register">Register</Link>
      </p>
    </>
  );
};
