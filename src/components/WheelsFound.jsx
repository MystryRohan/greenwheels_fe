import { useState, useEffect, useContext } from "react";
import "./styles/wheelsfound.css";
import axios from "axios";
import { Context, server } from "../main";

const WheelsFound = ({ driverPass }) => {
  const { fare, driverDets, setDriverDets, driver } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${server}/user/getdriver/${driver}`)
      .then(({ data }) => {
        setDriverDets(data.message);
      })
      .catch((e) => {
        console.log("err");
      });
  }, [driver]);
  console.log(driver, fare, driverDets);
  return (
    <div className="wheelsfound-container">
      <div className="main-section">
        <h1>Wheels Found!</h1>
      </div>
      <div className="wheels-details">
        <h1>Driver Details</h1>
        <div className="driver-profile">
          <img src="drivepfp.jpg" alt="driverpfp" />
          <div>
            <h3>{driverDets.driverName}</h3>
            <p>{driverDets.rating}</p>
          </div>
        </div>
        <div className="ride-details">
          <p>Going from:</p>
          <h3>{fare.from}</h3>
          <div className="draw-route"></div>
          <p>Going to:</p>
          <h3>{fare.to}</h3>
        </div>
      </div>
    </div>
  );
};

export default WheelsFound;
