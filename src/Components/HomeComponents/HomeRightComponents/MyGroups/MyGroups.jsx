import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g2.gif";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
const MyGroups = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [allgroup, setallgroup] = useState([]);
  const [allgroupRequest, setallgroupRequest] = useState([]);

  useEffect(() => {
    function groupInfoFetcher() {
      const starCountRef = ref(db, "group/");
      onValue(starCountRef, (snapshot) => {
        let groupBlankArr = [];
        snapshot.forEach((item) => {
          if (auth.currentUser.uid == item.val().whoCreateGroupUid) {
            groupBlankArr.push({ ...item.val(), groupKey: item.key });
          }
        });
        setallgroup(groupBlankArr);
      });
    }

    function getAllGroupRequest() {
      const starCountRef = ref(db, "groupJoinRequest/");
      onValue(starCountRef, (snapshot) => {
        let groupJoinRequestArr = [];
        snapshot.forEach((item) => {
          groupJoinRequestArr.push({
            ...item.val(),
            grouprequestKey: item.key,
          });
        });
        setallgroupRequest(groupJoinRequestArr);
      });
    }

    groupInfoFetcher();
    getAllGroupRequest();
  }, []);

  return (
    <>
      <div className="mt-5 h-[360px] w-[32%] rounded-xl px-3 py-2 shadow-xl">
        <div className="relative flex items-center justify-between">
          <span className="font-custom_poppins text-xl font-semibold">
            My Groups
            <span class="absolute left-[112px] top-[-7px] flex h-10 w-10">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5F35F5] opacity-75"></span>
              <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#5F35F5] text-white">
                {allgroup.length}
              </span>
            </span>
          </span>

          <span className="text-2xl text-primaryBlue">
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="mt-3 flex h-[85%] flex-col gap-y-5 overflow-y-scroll scrollbar-thin">
          {allgroup.map((item) => (
            <div
              className="flex items-start justify-between border-b-2 border-b-[#000000] border-opacity-[20%] pb-3"
              key={item.groupKey}
            >
              <div className="h-[70px] w-[70px] rounded-full shadow-lg">
                <picture>
                  <img
                    src={item.groupImage ? item.groupImage : GroupImg}
                    alt={item.groupImage ? item.groupImage : GroupImg}
                    className="h-full w-full rounded-full object-contain"
                  />
                </picture>
              </div>
              <div className="flex w-[50%] flex-col items-center justify-center text-wrap text-justify">
                <h1 className="font-custom_poppins text-lg font-semibold text-textPrimaryColor">
                  {item ? item.groupName : "Mern2307"}
                </h1>
                <p className="font-custom_poppins text-[14px] font-medium text-[#4D4D4D] opacity-[75%]">
                  {item ? item.groupTagName : "Mern2307"}
                </p>
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
