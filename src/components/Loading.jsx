import "./styles/loading.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from "../main";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Loading = ({ text, bookingID }) => {
  const [isFetching, setIsFetching] = useState(true);
  const { driverDets, setDriverDets, driver, setDriver, fare, setFare } =
    useContext(Context);

  const navigate = useNavigate();

  const fetchFareWithLongPolling = async () => {
    try {
      const { data } = await axios.post(
        `${server}/user/isrideaccepted/${bookingID}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        setFare(data.message);
        await setDriver(data.message.acceptedBy);
        console.log(data.message.acceptedBy);
        navigate("/acceptfare");
        setIsFetching(false);
      }
    } catch (error) {
      console.error("Error fetching fare:", error);
    }
  };

  useEffect(() => {
    if (isFetching) {
      fetchFareWithLongPolling();
      const interval = setInterval(() => {
        if (isFetching) {
          fetchFareWithLongPolling();
        }
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [bookingID]);

  return (
    <div className="loading-container">
      <div className="loader"></div>
      <h1>{text}</h1>
    </div>
  );
};

export default Loading;
