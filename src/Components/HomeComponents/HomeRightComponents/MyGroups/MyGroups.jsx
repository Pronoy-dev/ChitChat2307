import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g2.gif";
const MyGroups = () => {
  return (
    <>
      <div className="mt-5 h-[360px] w-[32%] rounded-xl px-3 py-2 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-custom_poppins text-xl font-semibold">
            My Groups
          </span>
          <span className="text-2xl text-primaryBlue">
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="mt-3 flex h-[85%] flex-col gap-y-5 overflow-y-scroll scrollbar-thin">
          {[...new Array(10)].map((_, index) => (
            <div className="flex items-start justify-between border-b-2 border-b-[#000000] border-opacity-[20%] pb-3">
              <div className="h-[70px] w-[70px] rounded-full shadow-lg">
                <picture>
                  <img
                    src={GroupImg}
                    alt={GroupImg}
                    className="h-full w-full rounded-full object-contain"
                  />
                </picture>
              </div>
              <div className="flex w-[50%] flex-col items-center justify-center text-wrap text-justify">
                <h1 className="font-custom_poppins text-lg font-semibold text-textPrimaryColor">
                  Raghav
                </h1>
                <span className="font-custom_poppins text-[14px] font-medium text-[#4D4D4D] opacity-[75%]">
                  Dinner?
                </span>
              </div>
              <div>
                <span className="mr-1 font-custom_poppins text-[14px] font-medium text-[#4D4D4D] opacity-[75%]">
                  Today, 8:56pm
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyGroups;