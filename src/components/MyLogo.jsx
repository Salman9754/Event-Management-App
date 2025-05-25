import React from "react";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const MyLogo = () => {
  return (
    <Link to={"/"}>
      <div className="left flex items-center text-2xl font-bold  gap-2">
        <img src={Logo} alt="" width={32} height={32} /> Eventify
      </div>
    </Link>
  );
};

export default MyLogo;
