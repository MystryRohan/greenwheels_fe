import { useContext, useState } from "react";
import "./styles/register.css";
import axios from "axios";
import { server, Context } from "../main";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [isSecond, setIsSecond] = useState("");

  const { setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(name, email, phone, address, password);
    //add request
    const { data } = await axios.post(
      `${server}/user/register`,
      { email, password, phone, address, name },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (data.success) {
      setIsAuthenticated(true);
      toast.success(data.message);
      navigate("/");
    } else {
      toast.error(data.message);
    }
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPassword("");
  };
  const isSecondHandler = () => {
    setIsSecond(true);
  };
  return (
    <div className="form-container">
      <h1>Greetings, Enter required details...</h1>
      <form className="form">
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
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={isSecond ? "" : "hide"}>
          <div className="form-fields">
            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-fields">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
        <Link to={"/wheelsregister"} color="black">
          Register as a Driver
        </Link>
      </div>
    </div>
  );
};

export default Register;
