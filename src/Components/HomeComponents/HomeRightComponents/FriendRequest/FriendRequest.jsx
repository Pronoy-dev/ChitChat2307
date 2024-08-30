import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { GetTimeNow } from "../../../../../Utils/Moments/Moment";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g1.gif";
import moment from "moment";
const FriendRequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [FriendRequestList, setFriendRequestList] = useState([]);

  /**
   * todo : Fetch all data from database
   * DBNAME : "FriendRequest"
   */

  useEffect(() => {
    const FriendRequestDbRef = ref(db, "FriendRequest/");
    onValue(FriendRequestDbRef, (snapshot) => {
      let FriendRequestArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid == item.val().whoRecivedFriendRequestUid) {
          FriendRequestArr.push({
            ...item.val(),
            FriendRequestKey: item.key,
          });
        }
      });
      setFriendRequestList(FriendRequestArr);
    });
  }, []);

  /**
   * rejectFriendRequest function implement
   * @param({item})
   */

  function rejectFriendRequest(item = {}) {
    const friendRequestRef = ref(db, "FriendRequest/" + item?.FriendRequestKey);
    remove(friendRequestRef);
  }
  /**
   * acceptFriendRequest function implement
   * @param({item})
   */

  function acceptFriendRequest(item = {}) {
    const FriendRef = ref(db, "Friends/");
    set(push(FriendRef), {
      ...item,
      createdAt: GetTimeNow(),
      whoRecivedFriendRequestUserKey: null,
    }).then(() => {
      const friendRequestRef = ref(
        db,
        "FriendRequest/" + item?.FriendRequestKey,
      );
      remove(friendRequestRef);
    });
  }

  return (
    <>
      <div className="mt-5 h-[360px] w-[32%] rounded-xl px-3 py-2 shadow-xl">
        <div className="relative flex items-center justify-between">
          <span className="font-custom_poppins text-xl font-semibold">
            Friend Request
            <span class="absolute left-[157px] top-[-7px] flex h-10 w-10">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5F35F5] opacity-75"></span>
              <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#5F35F5] text-white">
                {FriendRequestList?.length}
              </span>
            </span>
          </span>

          <span className="text-2xl text-primaryBlue">
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="mt-3 flex h-[85%] flex-col gap-y-5 overflow-y-scroll scrollbar-thin">
          {FriendRequestList.length > 0 ? (
            FriendRequestList?.map((item, index) => (
              <div className="flex items-center justify-between border-b-2 border-b-[#000000] border-opacity-[20%] pb-3">
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
                <div className="flex">
                  <button
                    className="mr-2 cursor-pointer rounded-xl bg-primaryBlue px-[22px] py-1 font-custom_poppins text-xl font-semibold text-white"
                    onClick={() => {
                      acceptFriendRequest(item);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="mr-2 cursor-pointer rounded-xl bg-red-500 px-[22px] py-1 font-custom_poppins text-xl font-semibold text-white"
                    onClick={() => {
                      rejectFriendRequest(item);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="flex h-full items-center justify-center">
              No Friend Request
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
