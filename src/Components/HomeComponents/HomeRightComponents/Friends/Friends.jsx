import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g2.gif";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { GetTimeNow } from "../../../../../Utils/Moments/Moment";
import moment from "moment/moment";

const Friends = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [FriendList, setFriendList] = useState([]);

  /**
   * todo : Fetch all data from database
   * DBNAME : "FriendRequest"
   */

  useEffect(() => {
    const FriendsDbRef = ref(db, "Friends/");
    onValue(FriendsDbRef, (snapshot) => {
      let FriendsArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid === item.val().whoRecivedFriendRequestUid) {
          FriendsArr.push({
            ...item.val(),
            FriendKey: item.key,
          });
        }
      });
      setFriendList(FriendsArr);
    });
  }, []);

  console.log(FriendList);

  return (
    <>
      <div className="mt-5 h-[360px] w-[32%] rounded-xl px-3 py-2 shadow-xl">
        <div className="relative flex items-center justify-between">
          <span className="font-custom_poppins text-xl font-semibold">
            Friend
            <span class="absolute left-[67px] top-[-7px] flex h-10 w-10">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5F35F5] opacity-75"></span>
              <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#5F35F5] text-white">
                {FriendList?.length}
              </span>
            </span>
          </span>

          <span className="text-2xl text-primaryBlue">
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="mt-3 flex h-[85%] flex-col gap-y-5 overflow-y-scroll scrollbar-thin">
          {FriendList.map((item, index) => (
            <div className="flex items-start justify-between border-b-2 border-b-[#000000] border-opacity-[20%] pb-3">
              <div className="h-[70px] w-[70px] rounded-full shadow-lg">
                <picture>
                  <img
                    src={
                      item.whoSendFriendRequestProfilePicture
                        ? item.whoSendFriendRequestProfilePicture
                        : GroupImg
                    }
                    alt={
                      item.whoSendFriendRequestProfilePicture
                        ? item.whoSendFriendRequestProfilePicture
                        : GroupImg
                    }
                    className="h-full w-full rounded-full object-contain"
                  />
                </picture>
              </div>
              <div className="flex w-[50%] flex-col items-center justify-center text-wrap text-justify">
                <h1 className="font-custom_poppins text-lg font-semibold text-textPrimaryColor">
                  {item.whoSendFriendRequestName
                    ? item.whoSendFriendRequestName
                    : "Mern 2307"}
                </h1>
                <span className="font-custom_poppins text-[14px] font-medium text-[#4D4D4D] opacity-[75%]">
                  {moment(item.createdAt).fromNow()}
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

export default Friends;
