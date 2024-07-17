import React from "react";
import HomeLeft from "../HomeLeft/HomeLeft";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <>
      <div className="flex h-screen gap-x-10 bg-slate-200 p-9">
        <HomeLeft />
      </div>
    </>
  );
};

export default RootLayout;
