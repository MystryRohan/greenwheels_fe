import { useContext, useState } from "react";
import "./styles/register.css";
import { server, Context } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const WheelsLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsWheelsAuthenticated } = useContext(Context);
  const navigator = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    //add request
    const { data } = await axios.post(
      `${server}/wheels/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );

    if (data.success) {
      setIsWheelsAuthenticated(true);
      toast.success(data.message);
      navigator("/getfares");
    } else {
      toast.error(data.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form-container">
      <h1>Go Green...</h1>
      <form onSubmit={submitHandler} className="form">
        <div>
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
        <button type="submit">Log in</button>
      </form>
      <div className="shiftuser">
        <Link to={"/login"} color="black">
          Login as a User
        </Link>
      </div>
    </div>
  );
};

export default WheelsLogin;
