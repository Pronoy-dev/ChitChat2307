import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g3.gif";
import moment from "moment/moment";
const UserList = () => {
  const db = getDatabase();
  const [users, setusers] = useState([]);
  /**
   * todo : Fetch all data from database
   * DBNAME : "users"
   */

  useEffect(() => {
    const userDbRef = ref(db, "users/");
    onValue(userDbRef, (snapshot) => {
      let userBlankArr = [];
      snapshot.forEach((item) => {
        userBlankArr.push({
          ...item.val(),
          userKey: item.key,
        });
      });
      setusers(userBlankArr);
    });
  }, []);
  console.log(users);

  return (
    <>
      <div className="mt-5 h-[360px] w-[32%] rounded-xl px-3 py-2 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-custom_poppins text-xl font-semibold">
            User List
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
                    alt={"GroupImg Missing"}
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
                <button className="mr-2 cursor-pointer rounded-xl bg-primaryBlue px-[22px] py-1 font-custom_poppins text-xl font-semibold text-white">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
