import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../main";
import { IoMdRefresh } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import "./styles/getfare.css";
const MyFares = () => {
  // const [myFares, setMyFares] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`${server}/user/myfares`, { withCredentials: true })
  //     .then(({ data }) => {
  //       console.log(data);
  //       setMyFares(data.message);
  //     })
  //     .catch((e) => {
  //       console.log("err", e);
  //     });
  // }, []);
  // console.log("myf", myFares);

  // const refreshPage = () => {
  //   setRefresh((prev) => !prev);
  // };

  const [myFares, setMyFares] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getMyFares = async (index) => {
      const response = await axios.get(`${server}/user/myfares?page=0`, {
        withCredentials: true,
      });
      setMyFares(response.data.message);
    };

    getMyFares(0);
  }, []);

  useEffect(() => {
    if (index !== 0) {
      appendFares();
    }
  }, [index]);

  const appendFares = async () => {
    const response = await axios.get(`${server}/user/myfares?page=${index}`, {
      withCredentials: true,
    });
    const temp = [...myFares];
    const loadedData = response.data.message;
    const appended = temp.concat(loadedData);
    setMyFares(appended);
  };

  const fetchData = async () => {
    console.log("fetchData called");
    setIndex((prev) => prev + 1);
  };
  console.log(myFares);
  return (
    <div
      className="fares-container"
      // id="scrollableDiv"
      // style={{ overflow: "auto", marginTop: "10vh" }}
      id="scrollableDiv"
      style={{ overflowY: "scroll" }}
    >
      <InfiniteScroll
        className="inf-scroll-div"
        dataLength={myFares && myFares.length > 0 ? myFares.length : 10}
        next={fetchData}
        hasMore={myFares.length < 25}
        loader={
          <div className="loader-cover">
            <div className="loader"></div>
          </div>
        }
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen all of your last 25 rides.</b>
          </p>
        }
      >
        <h1>My Fares</h1>
        {myFares ? (
          myFares.map((data, idx) => {
            return <Fare data={data} key={idx} />;
          })
        ) : (
          <div>No Fares</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

const Fare = ({ data, acceptHandler, rejectHandler, id }) => {
  return (
    <div className="fare">
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
    </div>
  );
};
export default MyFares;
