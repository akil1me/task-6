import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DataType = {
  id?: number;
  sender: string;
  recipient: string;
  title: string;
  body: string;
  postat: string;
};
type UserSliceStates = {
  messages: DataType[];
};

const initialState: UserSliceStates = {
  messages: [],
};

export const { reducer: messagesReducer, actions: messagesActions } =
  createSlice({
    name: "messages",
    initialState,
    reducers: {
      setMessages(state, { payload }: PayloadAction<DataType[]>) {
        state.messages = payload;
      },

      setAddMessage(state, { payload }: PayloadAction<DataType>) {
        state.messages = [...state.messages, payload];
      },
    },
  });
