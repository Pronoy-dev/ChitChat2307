import React from "react";
import ChatLeft from "../../Components/ChatComponents/ChatLeft";
import ChatRight from "../../Components/ChatComponents/ChatRight";

const Chat = () => {
  return (
    <>
      <div className="flex w-full gap-x-5">
        <div className="w-[30%]">
          <ChatLeft />
        </div>
        <div className="w-[70%] rounded-xl border-2 border-gray-300 p-8">
          <ChatRight />
        </div>
      </div>
    </>
  );
};

export default Chat;
