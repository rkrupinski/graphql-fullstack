import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Breed, CatInput } from "../generated/graphql";
import {
  composeValidators,
  validateMinLength,
  validateRequired,
} from "../utils";
import { Msg } from "./Msg";
import { Loading } from "./Loading";

export type CatFormProps = {
  initialValues?: CatInput;
  onSubmit: (data: CatInput) => Promise<void>;
  loading?: boolean;
};

const validateName = composeValidators(validateRequired, validateMinLength(2));

export const CatForm: React.FC<CatFormProps> = ({
  initialValues = ({ name: "", breed: "" } as any) as CatInput,
  onSubmit,
  loading,
}) => {
  const handleSubmit = React.useCallback(
    (values: CatInput, actions: FormikHelpers<CatInput>) => onSubmit(values),
    [onSubmit]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ errors, touched, values }) => (
        <Form noValidate autoComplete="off">
          <label htmlFor="name">Name</label>
          <div />
          <Field id="name" name="name" validate={validateName} />
          <div />
          {touched.name && errors.name && <Msg type="error">{errors.name}</Msg>}
          <label htmlFor="breed">Breed</label>
          <div />
          <Field
            id="breed"
            name="breed"
            component="select"
            validate={validateRequired}
          >
            {!values.breed && <option key="" />}
            {Object.entries(Breed).map(([name, value]) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </Field>
          <div />
          {touched.breed && errors.breed && (
            <Msg type="error">{errors.breed}</Msg>
          )}
          <br />
          <button type="submit" disabled={loading}>
            Save
          </button>
          <Loading visible={loading} inline />
        </Form>
      )}
    </Formik>
  );
};
