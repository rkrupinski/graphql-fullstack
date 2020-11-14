import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { MsgOutlet } from "../components/MsgOutlet";
import { Cats } from "./Cats";
import { Cat } from "./Cat";
import { AddCat } from "./AddCat";

export const App: React.FC = () => {
  const { path, url, isExact } = useRouteMatch();

  const Heading = React.useMemo(
    () =>
      React.createElement(
        isExact ? "h1" : "div",
        { style: { margin: "0 0 .5em", fontSize: "1em" } },
        <Link to="/app" style={{ fontWeight: "normal" }}>
          Cats 🐈
        </Link>
      ),
    [isExact]
  );

  return (
    <>
      <MsgOutlet />
      {Heading}
      <Switch>
        <Route path={path} exact strict component={Cats} />
        <Route path={`${path}/cat/:catId`}>
          <Cat backUrl={url} />
        </Route>
        <Route path={`${path}/addCat`}>
          <AddCat backUrl={url} />
        </Route>
      </Switch>
    </>
  );
};
