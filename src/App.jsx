import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import BookRide from "./components/BookRide";
import WheelsFound from "./components/WheelsFound";
import WheelsNotFound from "./components/WheelsNotFound";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";
import RentWheels from "./components/RentWheels";
import Loading from "./components/Loading";
import WheelsRegister from "./components/WheelsRegister";
import WheelsLogin from "./components/WheelsLogin";
import Profile from "./components/Profile";
import GetFares from "./components/GetFares";
import CarsAvailableForRent from "./components/CarsAvailableForRent";
import MyFares from "./components/MyFares";

export default function App() {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    wheels,
    setWheels,
    isWheelsAuthenticated,
    setIsWheelsAuthenticated,
    bookingID,
    driverDets,
    driver,
  } = useContext(Context);
  useEffect(() => {
    axios
      .get(`${server}/user/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        if (res.data.user !== undefined) {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        setUser({});
        setIsAuthenticated(false);
        console.log("catch");
      });
    //if driver logged
    axios
      .get(`${server}/wheels/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setWheels(res.data.wheels);
        if (res.data.wheels !== undefined) {
          setIsWheelsAuthenticated(true);
        }
      })
      .catch((error) => {
        setWheels({});
        setIsWheelsAuthenticated(false);
        console.log("catch");
      });
  }, [isAuthenticated, isWheelsAuthenticated]);

  return (
    <Router>
      <Toaster />
      <Nav
        isAuthenticated={isAuthenticated}
        isWheelsAuthenticated={isWheelsAuthenticated}
      />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/bookride"} element={<BookRide />} />
        <Route path={"/myfares"} element={<MyFares />} />
        <Route path={"/rentyourwheels"} element={<RentWheels />} />
        <Route path={"/wheelsregister"} element={<WheelsRegister />} />
        <Route path={"/wheelslogin"} element={<WheelsLogin />} />
        <Route path={"/getfares"} element={<GetFares />} />
        <Route path={"/getrentwheels"} element={<CarsAvailableForRent />} />
        <Route
          path={"/acceptfare"}
          element={<WheelsFound driverPass={driver} />}
        />
        <Route path={"/rejectfare"} element={<WheelsNotFound />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route
          path={"/lookingforwheels"}
          element={
            <Loading text={"Finding you wheels..."} bookingID={bookingID} />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
