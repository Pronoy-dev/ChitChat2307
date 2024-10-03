import React from "react";
import Search from "../CommonComponents/Search/Search";
import GroupList from "../HomeComponents/HomeRightComponents/GroupList/GroupList.jsx";
import Friends from "../HomeComponents/HomeRightComponents/Friends/Friends.jsx";
const ChatLeft = () => {
  return (
    <>
      <Search classname="w-full bg-white rounded-xl py-3 px-10" />
      <GroupList />
      <Friends />
    </>
  );
};

export default ChatLeft;
