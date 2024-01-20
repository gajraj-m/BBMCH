import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import { useSelector } from "react-redux";
import Dashboard from "./pages/app/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/app/Orders";
import Courses from "./pages/app/Courses";
import Analytics from "./pages/app/Analytics";
import Audience from "./pages/app/Audience";
import Plugins from "./pages/app/Plugins";
import Settings from "./pages/app/Settings";
import Appearance from "./pages/app/Appearance";

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
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/app">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="courses" element={<Courses />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="audience" element={<Audience />} />
            <Route path="appearance" element={<Appearance />} />
            <Route path="plugins" element={<Plugins />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
