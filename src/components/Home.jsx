import { Link } from "react-router-dom";
import { Context } from "../main";
import { useContext } from "react";

const Home = () => {
  const { isAuthenticated, isWheelsAuthenticated } = useContext(Context);

  return (
    <div className="container">
      <div className="landing">
        <h1>Welcome to Green Wheels!</h1>
        <p>
          We are a rental service that offers a wide range of electric vehicles
          to our customers.
        </p>
        {isAuthenticated || isWheelsAuthenticated ? (
          <></>
        ) : (
          <div className="home-login-btns">
            <div className="btn">
              <Link to={"/register"}>Sign up</Link>
            </div>
            <div
              className="btn"
              style={{
                backgroundColor: "white",
                border: "1px solid black",
              }}
            >
              <Link to={"/login"} style={{ color: "black" }}>
                Log in
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="alter">
        <div className="sidebyside">
          <img src="order_ride.png" alt="greenwheels"></img>
          <div>
            <h1>Join us. Earn on the journey!</h1>
            <p>
              As you drive towards your goals, pick up those who need a lift and
              drop them off at their destinations along the way.
            </p>
            <div className="btn">
              <Link to={isAuthenticated ? "/bookride" : "/login"}>
                Find Wheels
              </Link>
            </div>
          </div>
        </div>
        <div className="sidebyside">
          <img src={"electric_car.png"} alt="greenwheels"></img>
          <div>
            <h1>Have an EV! Rent it out with ease</h1>
            <p>Make money by renting out your car.</p>
            <div className="btn">
              <Link to={isAuthenticated ? "/rent" : "/login"}>Rent Wheels</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
