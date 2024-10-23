import axios from "axios";
import { server } from "../main";
import { useEffect, useState } from "react";
import "./styles/caravailableforrent.css";
import RentWheels from "./RentWheels";

const CarsAvailableForRent = () => {
  const [cars, setCars] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/wheels/getwheelsavailableforrent`, {
        withCredentials: true,
      })
      .then((res) => {
        setCars(res.data.cars);
        setRefresh((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const rentCarHandler = async (id) => {
    const car = cars.find((x) => x._id === id);
    let { data } = await axios.post(
      `${server}/wheels/getwheelsonrent/${id}`,
      { car },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    console.log(data);
  };

  return (
    <div className="rental-cars">
      <h1>Cars Available for rental</h1>
      <div className="cars-grid">
        {cars
          .filter((car) => car.rentedBy === null)
          .map((car) => (
            <Car
              car={car}
              rentCarHandler={rentCarHandler}
              id={car._id}
              key={car._id}
            />
          ))}
      </div>
    </div>
  );
};

const Car = ({ car, rentCarHandler, id }) => {
  return (
    <div className="car">
      <img src={"./car_prev.jfif"} alt="car-img" />
      <div>
        <div>
          <p>owner</p>
          <h4>{car.name}</h4>
        </div>
        <div>
          <p>vehicle</p>
          <h4>{car.vehicleName}</h4>
        </div>
        <div>
          <p>category</p>
          <h4>{car.category}</h4>
        </div>
        <div>
          <p>Registeration Number</p>
          <h4>{car.vehicleRegNumber}</h4>
        </div>
        <button className="rentwheels-btn" onClick={() => rentCarHandler(id)}>
          Rent Wheels
        </button>
      </div>
    </div>
  );
};

export default CarsAvailableForRent;
