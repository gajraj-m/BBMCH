import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blog: {},
  gallery: {}
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
  },
});

export const { setBlog, setGallery } = appSlice.actions;

export default appSlice.reducer;
