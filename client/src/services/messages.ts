import { Message, MsgType } from "../generated/graphql";
import { messagesVar } from "../cache";
import { mkId } from "../../../shared/src/utils";

export const addMessage = (type: MsgType, content: string) =>
  messagesVar([{ id: mkId(), type, content }, ...messagesVar()]);

export const clearMessages = () => messagesVar().length && messagesVar([]);
