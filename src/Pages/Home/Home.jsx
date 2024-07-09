import React from "react";
import HomeLeft from "../../Components/HomeComponents/HomeLeft/HomeLeft";
import HomeRight from "../../Components/HomeComponents/HomeRight/HomeRight";

const Home = () => {
  return (
    <>
      <div className="flex h-screen gap-x-10 bg-slate-200 p-9">
        <HomeLeft />
        <HomeRight />
      </div>
    </>
  );
};

export default Home;
