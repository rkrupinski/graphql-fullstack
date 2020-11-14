import * as React from "react";

export type LoadingProps = {
  visible?: boolean;
  inline?: boolean;
};

export const Loading: React.FC<LoadingProps> = ({ visible = true, inline }) => {
  const styles = React.useMemo(
    () => ({ display: visible ? (inline ? "inline-block" : "block") : "none" }),
    [inline, visible]
  );

  return (
    <div aria-hidden={!visible} style={styles}>
      Loading&hellip;
    </div>
  );
};
