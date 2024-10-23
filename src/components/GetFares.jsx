import axios from "axios";
import { server } from "../main.jsx";
import { useEffect, useState } from "react";
import "./styles/getfare.css";
import toast from "react-hot-toast";
import { IoMdRefresh } from "react-icons/io";

const GetFares = () => {
  const [fares, setFares] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/wheels/getfares`, {
        withCredentials: true,
      })
      .then((res) => {
        setFares(res.data.message);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [refresh]);

  const refreshPage = () => {
    setRefresh((prev) => !prev);
  };

  const acceptHandler = async (id) => {
    let fare = fares.find((x) => x._id === id);
    const { data } = await axios.post(
      `${server}/wheels/acceptfare/${id}`,
      { fare },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    if (data.success) {
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } else {
      toast.error("something went wrong");
    }
  };
  const rejectHandler = async (id) => {
    let fare = fares.find((x) => x._id === id);
    const { data } = await axios.post(
      `${server}/wheels/rejectfare/${id}`,
      { fare },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="fares-container">
      <h1>Available Fares...</h1>

      <IoMdRefresh
        size={25}
        onClick={refreshPage}
        cursor={"pointer"}
        className="get-fare-btn"
      />

      <ul className="fares-grid">
        {fares
          .filter((fare) => fare.acceptedBy === null)
          .map((fare, idx) => (
            <Fare
              data={fare}
              acceptHandler={acceptHandler}
              rejectHandler={rejectHandler}
              id={fare._id}
              key={fare._id}
            />
          ))}
      </ul>
    </div>
  );
};

const Fare = ({ data, acceptHandler, rejectHandler, id }) => {
  return (
    <div className="fare">
      <div>
        <label>Passenger Name</label>
        <h4>{data.user.name}</h4>
      </div>
      <div>
        <label>Passenger Phone</label>
        <h4>{data.user.phone}</h4>
      </div>

      <div className="from-to">
        <div>
          <label>from</label>
          <h4>{data.from}</h4>
        </div>
        <div>
          <label>to</label>
          <h4>{data.to}</h4>
        </div>
      </div>
      <div className="from-to">
        <button onClick={() => acceptHandler(id)}>Accept Ride</button>
        {/* <button onClick={() => rejectHandler(id)}>Reject Ride</button> */}
      </div>
    </div>
  );
};
export default GetFares;
