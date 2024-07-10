import React from "react";
import Search from "../../CommonComponents/Search/Search";
import GroupList from "../HomeRightComponents/GroupList/GroupList";
import Friends from "../HomeRightComponents/Friends/Friends";
import UserList from "../HomeRightComponents/UserList/UserList";
const HomeRight = () => {
  return (
    <>
      <div className="w-full">
        <Search classname={"w-full py-3 rounded-full pl-12"} />
        <div className="flex flex-wrap justify-between gap-y-6">
          <GroupList />
          <Friends />
          <UserList />
          <GroupList />
          <Friends />
          <UserList />
        </div>
      </div>
    </>
  );
};

export default HomeRight;
