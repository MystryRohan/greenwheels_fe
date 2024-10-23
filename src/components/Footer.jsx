import { BsInstagram, BsTwitterX, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <h1>Green Wheels</h1>
        <p>developed by Rohan Mistry</p>
      </div>
      <div className="links">
        <a href="#" target="_blank" rel="noopener noreferrer">
          {<BsInstagram />}
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <BsLinkedin />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <BsTwitterX />
        </a>
      </div>
    </div>
  );
};

export default Footer;
