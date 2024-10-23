import { useState } from "react";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { delay, motion } from "framer-motion";

const Nav = ({ isAuthenticated, isWheelsAuthenticated }) => {
  const navigator = useNavigate();
  const [phoneNav, setPhoneNav] = useState(false);

  return (
    <motion.div className="navbar">
      <h1 onClick={() => navigator("/")}>Green Wheels</h1>
      {isAuthenticated ? (
        <UserNav
          isAuthenticated={isAuthenticated}
          phoneNav={phoneNav}
          setPhoneNav={setPhoneNav}
        />
      ) : (
        <></>
      )}
      {isWheelsAuthenticated ? (
        <WheelsNav
          isWheelsAuthenticated={isWheelsAuthenticated}
          phoneNav={phoneNav}
          setPhoneNav={setPhoneNav}
        />
      ) : (
        <></>
      )}
      <AiOutlineMenu
        size={"25"}
        className="menu-btn"
        onClick={() => setPhoneNav((prev) => !prev)}
      />
    </motion.div>
  );
};

const LoginRegister = () => {
  return (
    <>
      <div className="btn">
        <Link to={"/register"}>Sign up</Link>
      </div>
      <div className="btn">
        <Link to={"/login"}>Log in</Link>
      </div>
    </>
  );
};

const UserNav = ({ isAuthenticated, phoneNav, setPhoneNav }) => {
  const animations = {
    ul: {
      initial: {
        x: "100%",
        y: 0,
        opacity: 0,
        backgroundColor: "white",
      },

      whileInView: { x: "0%", opacity: 1, y: 0, backgroundColor: "black" },
    },
  };

  return (
    <motion.ul className={`items ${phoneNav ? "menu" : ""}`} {...animations.ul}>
      <div className="btn">
        <Link
          to={isAuthenticated ? "/bookride" : "/login"}
          onClick={() => setPhoneNav((prev) => !prev)}
        >
          Find Wheels
        </Link>
      </div>
      <div className="btn">
        <Link
          to={isAuthenticated ? "/rentyourwheels" : "/login"}
          onClick={() => setPhoneNav((prev) => !prev)}
        >
          Rent Wheels
        </Link>
      </div>
      <div className="btn">
        <Link to={"/myfares"} onClick={() => setPhoneNav((prev) => !prev)}>
          My Fares
        </Link>
      </div>
      {/* <div className="btn">
        <Link to={"/about"} onClick={() => setPhoneNav((prev) => !prev)}>
          About
        </Link>
      </div> */}

      {isAuthenticated ? (
        <Link to={"/profile"} onClick={() => setPhoneNav((prev) => !prev)}>
          <AiOutlineUser cursor={"pointer"} color="white" size={"1.5rem"} />
        </Link>
      ) : (
        <LoginRegister />
      )}
    </motion.ul>
  );
};

const WheelsNav = ({ isWheelsAuthenticated, phoneNav, setPhoneNav }) => {
  const animations = {
    ul: {
      initial: {
        x: "100%",
        y: 0,
        opacity: 0,
        backgroundColor: "white",
      },

      whileInView: { x: "0%", opacity: 1, y: 0, backgroundColor: "black" },
    },
  };
  return (
    <motion.ul className={`items ${phoneNav ? "menu" : ""}`} {...animations.ul}>
      <div className="btn">
        <Link
          to={isWheelsAuthenticated ? "/getfares" : "/login"}
          onClick={() => setPhoneNav((prev) => !prev)}
        >
          Find Passengers
        </Link>
      </div>
      <div className="btn">
        <Link
          to={isWheelsAuthenticated ? "/getrentwheels" : "/login"}
          onClick={() => setPhoneNav((prev) => !prev)}
        >
          Rent Wheels
        </Link>
      </div>
      {/* <div className="btn">
        <Link to={"/about"} onClick={() => setPhoneNav((prev) => !prev)}>
          About
        </Link>
      </div> */}

      {isWheelsAuthenticated ? (
        <Link to={"/profile"} onClick={() => setPhoneNav((prev) => !prev)}>
          <AiOutlineUser cursor={"pointer"} color="white" size={"1.5rem"} />
        </Link>
      ) : (
        <LoginRegister />
      )}
    </motion.ul>
  );
};

export default Nav;
