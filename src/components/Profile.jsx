import axios from "axios";
import { Context, server } from "../main";
import { useContext, useEffect, useState } from "react";
import "./styles/profile.css";
import { BiEdit, BiSave } from "react-icons/bi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {
    user,
    setUser,
    wheels,
    setWheels,
    setIsAuthenticated,
    setIsWheelsAuthenticated,
  } = useContext(Context);
  // useEffect(() => {
  //   async function getProfile() {
  //     console.log("ingetprofile");
  //     try {
  //       let { data } = await axios.get(`${server}/user/profile`, {
  //         withCredentials: true,
  //       });
  //       if (data.success) {
  //         setUser(data);
  //         console.log(data);
  //       }
  //     } catch {
  //       setUser({});
  //       console.log("login first");
  //     }
  //     try {
  //       let { data } = await axios.get(`${server}/wheels/profile`, {
  //         withCredentials: true,
  //       });
  //       if (data.success) {
  //         setWheels(data);
  //         console.log(data);
  //       }
  //     } catch {
  //       setWheels(data);
  //       console.log("login first");
  //     }
  //   }
  //   getProfile();
  // }, []);
  return (
    <>
      {user ? (
        <UserProfile user={user} setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <WheelsProfile
          wheels={wheels}
          setIsWheelsAuthenticated={setIsWheelsAuthenticated}
        />
      )}
    </>
  );
};
const UserProfile = ({ user, setIsAuthenticated }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();
  const enableEdit = (e) => {
    e.preventDefault();
    setIsDisabled(false);
  };
  const saveChanges = (e) => {
    e.preventDefault();
    console.log("saved");
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="profile-container user">
      <form onSubmit={saveChanges}>
        <button
          type="button"
          onClick={logoutHandler}
          className="edit-btn"
          style={{ marginBottom: "10px" }}
        >
          Logout
        </button>
        <div className="edit-btns-div">
          {isDisabled ? (
            <button className="edit-btn" type="button" onClick={enableEdit}>
              Edit <BiEdit />
            </button>
          ) : (
            <button className="edit-btn" type="submit">
              Save <BiSave />
            </button>
          )}
        </div>
        <div className="form-fields">
          <label>Email</label>
          <input
            type="text"
            placeholder={user.email}
            disabled
            cursor={"pointer"}
          />
        </div>
        <div className="form-fields">
          <label>Name</label>
          <input
            type="text"
            placeholder={user.name}
            disabled={isDisabled}
            required
          />
        </div>
        <div className="form-fields">
          <label>Phone</label>
          <input
            type="tel"
            placeholder={user.phone}
            disabled={isDisabled}
            required
          />
        </div>
        <div className="form-fields">
          <label>Address</label>
          <input
            type="text"
            placeholder={user.address}
            disabled={isDisabled}
            required
          />
        </div>
      </form>
    </div>
  );
};
const WheelsProfile = ({ wheels, setIsWheelsAuthenticated }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const enableEdit = (e) => {
    e.preventDefault();
    setIsDisabled(false);
  };
  const saveChanges = async (e) => {
    e.preventDefault();
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/wheels/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsWheelsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed");
      console.log("bruhh");
      setIsWheelsAuthenticated(true);
    }
  };

  return (
    <div className="profile-container driver">
      <form onSubmit={saveChanges}>
        <button
          type="button"
          onClick={logoutHandler}
          className="edit-btn"
          style={{ marginBottom: "10px" }}
        >
          Logout
        </button>
        <div className="edit-btns-div">
          {isDisabled ? (
            <button className="edit-btn" type="button" onClick={enableEdit}>
              Edit <BiEdit />
            </button>
          ) : (
            <button className="edit-btn" type="submit">
              Save <BiSave />
            </button>
          )}
        </div>
        <div className="form-fields">
          <label>Email</label>
          <input type="email" placeholder={wheels.email} disabled />
        </div>
        <div className="form-fields">
          <label>Name</label>
          <input
            type="text"
            placeholder={wheels.driverName}
            disabled={isDisabled}
            required
          />
        </div>
        <div className="form-fields">
          <label>Car</label>
          <input
            type="text"
            placeholder={wheels.vehicleName}
            disabled={isDisabled}
            required
          />
        </div>
        <div className="form-fields">
          <label>Vehicle Registeration Number</label>
          <input
            type="text"
            placeholder={wheels.vehicleRegNumber}
            disabled={isDisabled}
            required
          />
        </div>
      </form>
    </div>
  );
};
export default Profile;
