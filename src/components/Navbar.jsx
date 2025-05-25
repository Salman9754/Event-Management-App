import React from "react";
import MyLogo from "./MyLogo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto flex justify-between py-3 px-3 mt-2">
        <MyLogo />
        <div className="right">
          <Link to={"/signup"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
