import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useCatsQuery } from "../../generated/graphql";
import { Msg } from "../../components/Msg";
import { Loading } from "../../components/Loading";

export const Cats: React.FC = () => {
  const { path } = useRouteMatch();
  const { loading, error, data } = useCatsQuery();

  if (loading) return <Loading />;
  if (error) return <Msg type="error">{error.message}</Msg>;

  return (
    <>
      {data?.cats.length ? (
        <ul>
          {data?.cats.map(({ id, name }) => (
            <li key={id}>
              <Link to={`${path}/cat/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cats :(</p>
      )}
      <Link to={`${path}/addCat`}>Add a Cat</Link>
    </>
  );
};
