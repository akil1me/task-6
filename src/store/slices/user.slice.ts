import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = string | null;

const getUser: User = localStorage.getItem("user");

const initialState: { user: User } = {
  user: getUser,
};

export const { reducer: userReducer, actions: userActions } = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      if (payload !== null) {
        state.user = payload;
        localStorage.setItem("user", payload);
      } else {
        state.user = null;
        localStorage.clear();
      }
    },
  },
});
