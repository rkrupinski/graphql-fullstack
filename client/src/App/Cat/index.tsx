import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { ViewCat } from "./ViewCat";
import { EditCat } from "./EditCat";

export type CatProps = {
  backUrl: string;
};

export const Cat: React.FC<CatProps> = ({ backUrl }) => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <ViewCat backUrl={backUrl} />
      </Route>
      <Route path={`${path}/edit`}>
        <EditCat backUrl={url} />
      </Route>
    </Switch>
  );
};
