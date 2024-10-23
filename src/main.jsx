import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

export const server = "http://localhost:5000/api/v1";
// export const server = "https://greenwheels-be.onrender.com/api/v1";
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isWheelsAuthenticated, setIsWheelsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [wheels, setWheels] = useState({});
  const [bookingID, setBookingID] = useState({});
  const [driverDets, setDriverDets] = useState({});
  const [driver, setDriver] = useState("");
  const [fare, setFare] = useState({});
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        wheels,
        setWheels,
        isWheelsAuthenticated,
        setIsWheelsAuthenticated,
        bookingID,
        setBookingID,
        driverDets,
        setDriverDets,
        fare,
        setFare,
        driver,
        setDriver,
      }}
    >
      <App />
    </Context.Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
