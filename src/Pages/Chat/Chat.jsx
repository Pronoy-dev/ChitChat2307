import React from "react";
import ChatLeft from "../../Components/ChatComponents/ChatLeft";
import ChatRight from "../../Components/ChatComponents/ChatRight";

const Chat = () => {
  return (
    <>
      <div className="flex w-full">
        <div className="w-[30%]">
          <ChatLeft />
        </div>
        <div className="w-[70%]">
          <ChatRight />
        </div>
      </div>
    </>
  );
};

export default Chat;
