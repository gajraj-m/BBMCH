import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../config/config";

const initialState = {
  currentPage: 0,
  sideBarExpand: true,
  loading: false,
  currentUser: null,
  error: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSideBarExpand: (state, action) => {
      state.sideBarExpand = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    setFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signup: (state, action) => {
      const { email, password } = action.payload;
      
    },
  },
});

export const { setAppPage, setSideBarExpand, setLoading } = appSlice.actions;

export default appSlice.reducer;
