import * as React from "react";
import { useMessagesQuery, Message } from "../generated/graphql";
import { clearMessages } from "../../src/services/messages";
import { Msg } from "./Msg";

export const MsgOutlet: React.FC = () => {
  const { data } = useMessagesQuery();
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useLayoutEffect(() => {
    if (data?.messages.length) setMessages(data.messages);
    clearMessages();
  }, [data?.messages]);

  return messages.length ? (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {messages.map(({ id, type, content }) => (
        <li key={id}>
          <Msg type={type}>{content}</Msg>
        </li>
      ))}
    </ul>
  ) : null;
};
