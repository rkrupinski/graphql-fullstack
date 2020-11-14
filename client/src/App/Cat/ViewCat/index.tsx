import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  CatsDocument,
  useCatQuery,
  useDeletecatMutation,
} from "../../../generated/graphql";
import { Loading } from "../../../components/Loading";
import { Msg } from "../../../components/Msg";

export type ViewCatProps = {
  backUrl: string;
};

export const ViewCat: React.FC<ViewCatProps> = ({ backUrl }) => {
  const { push } = useHistory();
  const { params, url } = useRouteMatch<{ catId: string }>();

  const { data, error, loading } = useCatQuery({
    variables: { id: params.catId },
  });

  const [
    deleteCat,
    { error: deleteError, loading: deleteLoading },
  ] = useDeletecatMutation();

  const handleDelete = async () => {
    if (!confirm(`Delete ${data?.cat?.name}? 😿`)) return;

    try {
      await deleteCat({
        variables: { id: params.catId },
        refetchQueries: [{ query: CatsDocument }],
        awaitRefetchQueries: true,
      });

      push(backUrl);
    } catch (err) {}
  };

  if (loading || deleteLoading) return <Loading />;
  if (error) return <Msg type="error">{error.message}</Msg>;
  if (deleteError) return <Msg type="error">{deleteError.message}</Msg>;
  if (!data?.cat) return <Msg type="error">No such cat :(</Msg>;

  const { cat } = data;

  return (
    <>
      <h1>{cat.name}</h1>
      <dl>
        <dt>
          <strong>Breed:</strong>
        </dt>
        <dd style={{ textTransform: "capitalize" }}>{cat.breed}</dd>
        <dt>
          <strong>Gifs:</strong>
        </dt>
        <dd>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {cat.gifs.map(({ id, src, label }) => (
              <li key={id} style={{ display: "inline", marginRight: ".5em" }}>
                <a href={src} target="_blank" rel="noopener noreferrer">
                  <img
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                    width="100"
                    height="100"
                    src={src}
                    alt={label}
                  />
                </a>
              </li>
            ))}
          </ul>
        </dd>
      </dl>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <br />
      <Link to={`${url}/edit`}>Edit</Link>
      <br />
      <Link to={backUrl}>Back</Link>
    </>
  );
};
