import React from "react";
import avatar from "../../assets/ChatAssets/Ellipse 3.png";
import { BsThreeDotsVertical } from "react-icons/bs";
const ChatRight = () => {
  return (
    <>
      <div className="flex items-center justify-between border-b-2 border-b-[rgb(0,0,0,.25)]">
        <div className="flex items-center gap-x-[33px]">
          <picture>
            <img src={avatar} alt={avatar} />
          </picture>
          <div className="flex flex-col">
            <h3>Swathi </h3>
            <p>Online</p>
          </div>
        </div>

        <span>
          <BsThreeDotsVertical className="text-2xl text-primaryBlue" />
        </span>
      </div>
    </>
  );
};

export default ChatRight;
