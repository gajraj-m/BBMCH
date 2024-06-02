import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {},
  gallery: {},
  constants: {}
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload;
    },
    setGallery: (state, action) => {
      state.gallery = action.payload;
    },
    setConstants: (state, action) => {
      state.constants = action.payload;
    },
  },
});

export const { setBlog, setGallery, setConstants } = appSlice.actions;

export default appSlice.reducer;
