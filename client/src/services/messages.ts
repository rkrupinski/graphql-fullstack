import { mkId } from "@shared/utils";
import { MsgType } from "../generated/graphql";
import { messagesVar } from "../cache";

export const addMessage = (type: MsgType, content: string) =>
  messagesVar([{ id: mkId(), type, content }, ...messagesVar()]);

export const clearMessages = () => messagesVar().length && messagesVar([]);
