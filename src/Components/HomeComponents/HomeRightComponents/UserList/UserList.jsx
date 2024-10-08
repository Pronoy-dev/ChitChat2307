import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import GroupImg from "../../../../assets/HomeAssets/HomeLeftAssets/Profile.png";
import moment from "moment/moment";
import { getAuth } from "firebase/auth";
import { GetTimeNow } from "../../../../../Utils/Moments/Moment";
const UserList = () => {
  const db = getDatabase();
  const auth = getAuth();
  const [users, setusers] = useState([]);
  const [isFriendRequest, setisFriendRequest] = useState([]);
  /**
   * todo : Fetch all data from database
   * DBNAME : "users"
   */

  useEffect(() => {
    const userDbRef = ref(db, "users/");
    onValue(userDbRef, (snapshot) => {
      let userBlankArr = [];
      snapshot.forEach((item) => {
        if (auth.currentUser.uid !== item.val().uid) {
          userBlankArr.push({
            ...item.val(),
            userKey: item.key,
          });
        }
      });
      setusers(userBlankArr);
    });
  }, []);

  /**
   * todo : handleFriendRequest function implement
   * @param({user})
   */

  function handleFriendRequest(user) {
    const FriendRequestRef = ref(db, "FriendRequest/");
    set(push(FriendRequestRef), {
      whoSendFriendRequestName: auth.currentUser.displayName,
      whoSendFriendRequestEmail: auth.currentUser.email,
      whoSendFriendRequestUid: auth.currentUser.uid,
      whoSendFriendRequestProfilePicture: auth.currentUser.photoURL
        ? auth.currentUser.photoURL
        : null,

      whoRecivedFriendRequestUid: user.uid,
      whoRecivedFriendRequestName: user.userName,
      whoRecivedFriendRequestEmail: user.userEmail,
      whoRecivedFriendRequestUserKey: user.userKey,
      whoRecivedFriendRequestProfilePicture: user.usersProfile_picture,
      createdAt: GetTimeNow(),
    });
  }

  /**
   * todo : Fetch data from friendRequest
   * @param({})
   * hooks useEffect()
   */

  useEffect(() => {
    const friendRequestDbRef = ref(db, "FriendRequest/");
    onValue(friendRequestDbRef, (snapshot) => {
      let blankFriendRequestList = [];
      snapshot.forEach((item) => {
        blankFriendRequestList.push(
          item.val().whoRecivedFriendRequestUid +
            item.val().whoSendFriendRequestUid,
        );
      });
      setisFriendRequest(blankFriendRequestList);
    });
  }, []);

  return (
    <>
      <div className="mt-5 h-[360px] w-[32%] rounded-xl px-3 py-2 shadow-xl">
        <div className="relative flex items-center justify-between">
          <span className="font-custom_poppins text-xl font-semibold">
            User List
            <span class="absolute left-[91px] top-[-7px] flex h-10 w-10">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5F35F5] opacity-75"></span>
              <span class="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#5F35F5] text-white">
                {users.length}
              </span>
            </span>
          </span>

          <span className="text-2xl text-primaryBlue">
            <BsThreeDotsVertical />
          </span>
        </div>
        <div className="mt-3 flex h-[85%] flex-col gap-y-5 overflow-y-scroll scrollbar-thin">
          {users.map((user) => (
            <div className="flex items-center justify-between border-b-2 border-b-[#000000] border-opacity-[20%] pb-3">
              <div className="h-[70px] w-[70px] rounded-full shadow-lg">
                <picture>
                  <img
                    src={
                      user.usersProfile_picture
                        ? user.usersProfile_picture
                        : GroupImg
                    }
                    alt={
                      user.usersProfile_picture
                        ? user.usersProfile_picture
                        : GroupImg
                    }
                    className="h-full w-full rounded-full object-contain"
                  />
                </picture>
              </div>
              <div className="flex w-[50%] flex-col items-center justify-center text-wrap text-justify">
                <h1 className="font-custom_poppins text-lg font-semibold text-textPrimaryColor">
                  {user.userName ? user.userName : "Name xyz"}
                </h1>
                <span className="font-custom_poppins text-[14px] font-medium text-[#4D4D4D] opacity-[75%]">
                  {moment(user.createdAt).calendar()}
                </span>
              </div>
              <div>
                {isFriendRequest.includes(
                  user.uid + auth.currentUser.uid ||
                    auth.currentUser.uid + user.uid,
                ) ? (
                  <button className="mr-2 cursor-pointer rounded-xl bg-primaryBlue px-[22px] py-1 font-custom_poppins text-xl font-semibold text-white">
                    -
                  </button>
                ) : (
                  <button
                    onClick={() => handleFriendRequest(user)}
                    className="mr-2 cursor-pointer rounded-xl bg-primaryBlue px-[22px] py-1 font-custom_poppins text-xl font-semibold text-white"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
