import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import "../styles/components.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="home_page h-screen">
        <Navbar />
        <div className="container home_container mx-auto flex justify-center items-center h-screen flex-col w-full lg:w-[82%] gap-5">
          <div className="headings">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-medium text-center">
              Host Events Like a Pro
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-medium sub-head">
              Built to Scale for Any Crowd
            </h1>
          </div>
          <p className="text-center mt-5 w-[90%] lg:w-[70%]">
            Eventify is a modern, full-stack event management solution. Launch
            your platform with event creation, participant tracking, approval
            workflows, role-based dashboards, real-time updates, and secure
            authentication.
          </p>
          <div className="Auth_buttons flex gap-5 mt-4">
            <Link to={"/login"}>

            <Button>Sign in here</Button>
            </Link>
            <Link to={"/signup"}>
            <Button className="bg-neutral-800 hover:bg-neutral-700">
              Sign up here
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
