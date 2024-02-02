import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
});

export const { setBlog } = appSlice.actions;

export default appSlice.reducer;
