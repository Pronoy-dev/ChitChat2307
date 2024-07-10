import React from "react";
import HomeLeft from "../HomeLeft/HomeLeft";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <>
      <div>
        <HomeLeft />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
