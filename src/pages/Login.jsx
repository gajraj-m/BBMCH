import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../config/axios";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../components/ui/button";
import { CONST } from "../config";
import axios from "axios";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import "firebase/auth";
import { db } from "../config/firebase";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const loginInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        try {
          const authUser = result.user;
          const user = {
            id: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            profilePicture: authUser.photoURL,
          };
          setDoc(doc(db, "user", user.id), user);
          dispatch(signInSuccess(user));
          navigate("/");
        } catch (error) {
          dispatch(signInFailure(error));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const { email, password } = formData;
      const res = await signInWithEmailAndPassword(auth, email, password);
      const authUser = res.user;
      const user = {
        id: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName,
        profilePicture: authUser.photoURL,
      };
      await setDoc(doc(db, "user", user.id), user);
      dispatch(signInSuccess(user));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto pt-24">
      <h1 className="text-3xl text-center font-semibold my-7">Log In</h1>
      <Button variant="secondary" className="flex space-x-2 mb-4 mx-auto" onClick={loginInWithGoogle}>
        <FcGoogle size={25} />
        <span className="text-sm font-light">Continue with Google</span>
      </Button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Log In"}
        </button>
        {/* <OAuth /> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/register">
          <span className="text-blue-500">Register</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
