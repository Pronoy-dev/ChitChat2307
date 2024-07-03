import React, { useState } from "react";
import Profile from "../../../assets/HomeAssets/HomeLeftAssets/Profile.png";
import Home from "../../../assets/HomeAssets/HomeLeftAssets/Home.gif";
import Chat from "../../../assets/HomeAssets/HomeLeftAssets/Chat.gif";
import Bell from "../../../assets/HomeAssets/HomeLeftAssets/Bell.gif";
import Settings from "../../../assets/HomeAssets/HomeLeftAssets/Settings.gif";
import Logout from "../../../assets/HomeAssets/HomeLeftAssets/Log-out.png";
const HomeLeft = () => {
  const [test, settest] = useState("home");
  return (
    <>
      <div className="flex h-full w-[186px] flex-col items-center justify-start rounded-2xl bg-[#5F35F5]">
        <div className="flex flex-col items-center justify-center gap-y-[83px] pt-10">
          <div>
            <picture>
              <img src={Profile} alt={Profile} />
            </picture>
          </div>
          <div
            className={`${test == "home" && "iconsShaded w-full cursor-pointer rounded-l-lg bg-white px-14 py-2"}`}
          >
            <picture>
              <img
                src={Home}
                alt={Home}
                className="w-10 cursor-pointer mix-blend-multiply"
              />
            </picture>
          </div>
          <div
            className={`${test == "Chat" && "iconsShaded w-full cursor-pointer rounded-l-lg bg-white px-14 py-2"}`}
          >
            <picture>
              <img
                src={Chat}
                alt={Chat}
                className="w-10 cursor-pointer mix-blend-multiply"
              />
            </picture>
          </div>
          <div
            className={`${test == "Bell" && "iconsShaded w-full cursor-pointer rounded-l-lg bg-white px-14 py-2"}`}
          >
            <picture>
              <img
                src={Bell}
                alt={Bell}
                className="w-10 cursor-pointer mix-blend-multiply"
              />
            </picture>
          </div>
          <div
            className={`${test == "Settings" && "iconsShaded w-full cursor-pointer rounded-l-lg bg-white px-14 py-2"}`}
          >
            <picture>
              <img
                src={Settings}
                alt={Settings}
                className="w-10 cursor-pointer mix-blend-multiply"
              />
            </picture>
          </div>
        </div>
        <div className="pt-[83px]">
          <picture>
            <img src={Logout} alt={Logout} className="w-10 cursor-pointer" />
          </picture>
        </div>
      </div>
    </>
  );
};

export default HomeLeft;
