import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Literary from './pages/societies/Literary'
import Cultural from './pages/societies/Cultural'
import AudioVisual from "./pages/societies/AudioVisual";
import Athletic from "./pages/societies/Athletic";
import Dramatic from "./pages/societies/Dramatic";
import FineArts from "./pages/societies/FineArts";
import SocialService from "./pages/societies/SocialService";
import Hostel from "./pages/societies/Hostel";
import Footer from "./components/Footer";

function App() {

 useEffect(() => {
   Aos.init({
     duration: 1800,
     offset: 100,
     // disable: "mobile",
   });
 }, []);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      {/* header */}
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/societies">
          <Route path="literary" element={<Literary />} />
          <Route path="cultural" element={<Cultural />} />
          <Route path="audio-visual" element={<AudioVisual />} />
          <Route path="athletic" element={<Athletic />} />
          <Route path="dramatic" element={<Dramatic />} />
          <Route path="fine-arts" element={<FineArts />} />
          <Route path="social-service" element={<SocialService />} />
          <Route path="hostel-welfare" element={<Hostel />} />
        </Route>

        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
