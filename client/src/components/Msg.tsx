import * as React from "react";

type MsgType = "error" | "success";

const getStyles = (msgType: MsgType): React.CSSProperties => {
  switch (msgType) {
    case "error":
      return { color: "red" };

    case "success":
      return { color: "green" };
    default:
      return {};
  }
};

export type MsgProps = {
  type: MsgType;
};

export const Msg: React.FC<MsgProps> = ({ type, children }) => {
  const styles = React.useMemo(
    () => ({ margin: "0 0 .5em", ...getStyles(type) }),
    [type]
  );

  return <p style={styles}>{children}</p>;
};
