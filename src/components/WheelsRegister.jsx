import { useContext, useState } from "react";
import "./styles/register.css";
import axios from "axios";
import { server, Context } from "../main";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const WheelsRegister = () => {
  const [driverName, setDriverName] = useState("");
  const [email, setEmail] = useState("");
  const [driverImage, setDriverImage] = useState("");
  const [category, setCategory] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleImage, setVehicleImage] = useState("");
  const [vehicleRegNumber, setVehicleRegNumber] = useState("");
  const [password, setPassword] = useState("");

  const [isSecond, setIsSecond] = useState("");

  const { setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    //add request
    const { data } = await axios.post(
      `${server}/wheels/register`,
      {
        email,
        driverName,
        driverImage,
        category,
        vehicleName,
        vehicleImage,
        vehicleRegNumber,
        password,
      },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (data.success) {
      setIsAuthenticated(true);
      toast.success(data.message);
      navigate("/");
    } else {
      toast.error(data.message);
    }
    setDriverName("");
    setDriverImage("");
    setCategory("");
    setEmail("");
    setPassword("");
    setVehicleImage("");
    setVehicleName("");
    setVehicleRegNumber("");
  };
  const isSecondHandler = () => {
    setIsSecond(true);
  };
  return (
    <div className="form-container">
      <h1>Welcome!</h1>
      <form className="form">
        <div className={isSecond ? "hide" : ""}>
          <div className="form-fields">
            <label>Full Name</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-fields">
            <label>Driver Image</label>
            <input
              type="file"
              value={driverImage}
              onChange={(e) => setDriverImage(e.target.value)}
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
            <label>Vehicle Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              Sign up
            </button>
          ) : (
            <button type="button" onClick={isSecondHandler}>
              Next
            </button>
          )}
        </>
      </form>
      <div className="shiftuser">
        <Link to={"/register"} color="black">
          Register as a User
        </Link>
      </div>
    </div>
  );
};

export default WheelsRegister;
