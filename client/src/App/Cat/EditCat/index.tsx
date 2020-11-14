import * as React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  CatDocument,
  CatInput,
  useCatQuery,
  useEditcatMutation,
} from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { Msg } from "../../../components/Msg";
import { CatForm } from "../../../components/CatForm";

export type EditCatProps = {
  backUrl: string;
};

export const EditCat: React.FC<EditCatProps> = ({ backUrl }) => {
  const { push } = useHistory();
  const { params } = useRouteMatch<{ catId: string }>();

  const [
    editCat,
    { loading: editLoading, error: editError },
  ] = useEditcatMutation();

  const { data, error, loading } = useCatQuery({
    variables: { id: params.catId },
  });

  const onSubmit = React.useCallback(async (data: CatInput) => {
    try {
      await editCat({
        variables: {
          id: params.catId,
          data: {
            name: data.name,
            breed: data.breed,
          },
        },
        refetchQueries: [
          { query: CatDocument, variables: { id: params.catId } },
        ],
        awaitRefetchQueries: true,
      });

      push(backUrl);
    } catch (err) {}
  }, []);

  if (loading) return <Loading />;
  if (error) return <Msg type="error">{error.message}</Msg>;
  if (editError) return <Msg type="error">{editError.message}</Msg>;
  if (!data?.cat) return <Msg type="error">No such cat :(</Msg>;

  return (
    <>
      <h1>Edit {data.cat.name}</h1>
      <CatForm
        loading={editLoading}
        initialValues={data.cat}
        onSubmit={onSubmit}
      />
      <br />
      <Link to={backUrl}>Back</Link>
    </>
  );
};
