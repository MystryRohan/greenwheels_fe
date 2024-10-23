import { useContext, useState } from "react";
import "./styles/bookride.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from "../main";
import { Navigate, useNavigate } from "react-router-dom";

const BookRide = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { bookingID, setBookingID } = useContext(Context);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${server}/user/bookwheels`,
      { from, to },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (data.success) {
      toast.success(data.message);
      setBookingID(data.id);
      navigate("/lookingforwheels");
    } else {
      toast.error(data.message);
      navigate("/login");
    }
  };
  return (
    <div className="bookride">
      <div className="text-image">
        <h1>Go anywhere with Green Wheels...</h1>
        <img src="bookride.png" alt="bookride" />
      </div>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Starting from..."
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        <input
          placeholder="Going to..."
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <button type="submit">Find Wheels</button>
      </form>
    </div>
  );
};

export default BookRide;
