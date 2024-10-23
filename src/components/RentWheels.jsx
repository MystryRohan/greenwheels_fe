import { useContext, useState } from "react";
import "./styles/rentwheels.css";
import axios from "axios";
import { server, Context } from "../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RentWheels = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const [vehicleRegNumber, setVehicleRegNumber] = useState("");

  const [isSecond, setIsSecond] = useState("");

  const { setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${server}/user/rentwheels`,
      { email, name, category, vehicleName, vehicleImage, vehicleRegNumber },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
      navigate("/login");
    }

    setName("");
    setEmail("");
    setCategory("");
    setVehicleImage("");
    setVehicleName("");
    setVehicleRegNumber("");
  };
  const isSecondHandler = () => {
    setIsSecond(true);
  };
  return (
    <div className="form-container">
      <h1>Hi, Enter your EV details...</h1>
      <form className="form" onSubmit={submitHandler}>
        <div className={isSecond ? "hide" : ""}>
          <div className="form-fields">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-fields">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-fields">
            <label>vehicle Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={isSecond ? "" : "hide"}>
          <div className="form-fields">
            <label>Vehicle Name</label>
            <input
              type="text"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              required
            />
          </div>
          <div className="form-fields">
            <label>Vehicle Image</label>
            <input
              type="file"
              value={vehicleImage}
              onChange={(e) => setVehicleImage(e.target.value)}
              required
            />
          </div>
          <div className="form-fields">
            <label>Vehicle Registeration Number</label>
            <input
              type="text"
              value={vehicleRegNumber}
              onChange={(e) => setVehicleRegNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <>
          {isSecond ? (
            <button type="button" onClick={submitHandler}>
              Rent Wheels
            </button>
          ) : (
            <button type="button" onClick={isSecondHandler}>
              Next
            </button>
          )}
        </>
      </form>
    </div>
  );
};

export default RentWheels;
