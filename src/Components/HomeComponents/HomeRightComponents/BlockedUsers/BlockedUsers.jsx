import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g3.gif";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { GetTimeNow } from "../../../../../Utils/Moments/Moment";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
const BlockedUsers = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [BlockUserList, setBlockUserList] = useState([]);

  /**
   * todo : Fetch all data from database
   * DBNAME : "FriendRequest"
   */

  useEffect(() => {
    const blockDbRef = ref(db, "blockedUsers/");
    onValue(blockDbRef, (snapshot) => {
      let blockBlanckkArr = [];
      snapshot.forEach((item) => {
        if (1) {
          blockBlanckkArr.push({
            ...item.val(),
            BlockKey: item.key,
          });
        }
      });
      setBlockUserList(blockBlanckkArr);
    });
  }, []);

  console.log(BlockUserList);

  /**
   * todo : handleUnblock function implement
   * @param {*} item
   */

  function handleUnblock(item = {}) {
    const unblockObj = {
      FriendRequestKey: item.FriendRequestKey,
      createdAt: GetTimeNow(),
      whoRecivedFriendRequestEmail: item.blockedbyEmail,
      whoRecivedFriendRequestName: item.blockedbyName,
      whoRecivedFriendRequestProfilePicture: item.blockedbyProfilePic,
      whoRecivedFriendRequestUid: item.blockedbyUid,
      whoSendFriendRequestEmail: item.blockedEmail,
      whoSendFriendRequestName: item.blockedName,
      whoSendFriendRequestUid: item.blockedUid,
      whoSendFriendRequestProfilePicture: item.blockedProfilePic
        ? item.blockedProfilePic
        : "",
    };
    const FriendsRef = ref(db, "Friends/");
    set(push(FriendsRef), unblockObj).then(() => {
      remove(ref(db, "blockedUsers/" + item.BlockKey));
    });
  }

  return (
    <>
      <div className="mt-5 h-[360px] w-[32%] rounded-xl px-3 py-2 shadow-xl">
        <div className="relative flex items-center justify-between">
          <span className="font-custom_poppins text-xl font-semibold">
            Blocked Users
            <span class="absolute left-[146px] top-[-7px] flex h-10 w-10">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5F35F5] opacity-75"></span>
              <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#5F35F5] text-white">
                {BlockUserList.length}
              </span>
            </span>
          </span>

          <span className="text-2xl text-primaryBlue">
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="mt-3 flex h-[85%] flex-col gap-y-5 overflow-y-scroll scrollbar-thin">
          {BlockUserList?.map((item, index) => (
            <div className="flex items-center justify-between border-b-2 border-b-[#000000] border-opacity-[20%] pb-3">
              <div className="h-[70px] w-[70px] rounded-full shadow-lg">
                <picture>
                  <img
                    src={
                      item.blockedProfilePic ? item.blockedProfilePic : GroupImg
                    }
                    alt={GroupImg}
                    className="h-full w-full rounded-full object-contain"
                  />
                </picture>
              </div>
              <div className="flex w-[50%] flex-col items-center justify-center text-wrap text-justify">
                <h1 className="font-custom_poppins text-lg font-semibold text-textPrimaryColor">
                  {item.blockedName ? item.blockedName : "MERN"}
                </h1>
                <p className="font-custom_poppins text-[14px] font-medium text-[#4D4D4D] opacity-[75%]">
                  {item.blockedEmail ? item.blockedEmail : "xyz"}
                </p>
              </div>
              <div>
                <button
                  onClick={() => handleUnblock(item)}
                  className="mr-2 cursor-pointer rounded-xl bg-primaryBlue px-[22px] py-1 font-custom_poppins text-xl font-semibold text-white"
                >
                  Unblock
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlockedUsers;
