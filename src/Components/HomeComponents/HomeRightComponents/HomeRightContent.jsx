import React from "react";
import GroupList from "../HomeRightComponents/GroupList/GroupList";
import Friends from "../HomeRightComponents/Friends/Friends";
import UserList from "../HomeRightComponents/UserList/UserList";
import FriendRequest from "../HomeRightComponents/FriendRequest/FriendRequest";
import MyGroups from "../HomeRightComponents/MyGroups/MyGroups";
import BlockedUsers from "../HomeRightComponents/BlockedUsers/BlockedUsers";
import Search from "../../CommonComponents/Search/Search";
const HomwRightContent = () => {
  return (
    <div>
      <Search classname="w-full py-3 rounded-full pl-14" />
      <div className="flex flex-wrap justify-between">
        <GroupList />
        <Friends />
        <UserList />
        <FriendRequest />
        <MyGroups />
        <BlockedUsers />
      </div>
    </div>
  );
};

export default HomwRightContent;
