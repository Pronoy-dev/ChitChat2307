import React from "react";
import Search from "../../CommonComponents/Search/Search";
import GroupList from "../HomeRightComponents/GroupList/GroupList";
import Friends from "../HomeRightComponents/Friends/Friends";
import UserList from "../HomeRightComponents/UserList/UserList";
import FriendRequest from "../HomeRightComponents/FriendRequest/FriendRequest";
import MyGroups from "../HomeRightComponents/MyGroups/MyGroups";
import BlockedUsers from "../HomeRightComponents/BlockedUsers/BlockedUsers";
import { Outlet } from "react-router-dom";

const HomeRight = () => {
  return (
    <>
      <div className="w-full">
        <Search classname={"w-full py-3 rounded-full pl-12"} />
        <Outlet />
      </div>
    </>
  );
};

export default HomeRight;
