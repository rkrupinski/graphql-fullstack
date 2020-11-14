import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  CatInput,
  CatsDocument,
  useAddcatMutation,
} from "../../generated/graphql";
import { CatForm } from "../../components/CatForm";
import { Msg } from "../../components/Msg";

export type AddCatProps = {
  backUrl: string;
};

export const AddCat: React.FC<AddCatProps> = ({ backUrl }) => {
  const { push } = useHistory();
  const [addCat, { loading, error }] = useAddcatMutation();

  const onSubmit = React.useCallback(
    async (data: CatInput) => {
      try {
        await addCat({
          variables: { data },
          refetchQueries: [{ query: CatsDocument }],
          awaitRefetchQueries: true,
        });

        push(backUrl);
      } catch (err) {}
    },
    [addCat, push, backUrl]
  );

  return (
    <>
      <h1>Add Cat</h1>
      {error && <Msg type="error">{error.message}</Msg>}
      <CatForm loading={loading} onSubmit={onSubmit} />
      <br />
      <Link to={backUrl}>Back</Link>
    </>
  );
};
