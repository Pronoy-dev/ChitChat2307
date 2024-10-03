import React, { useState } from "react";
import avatar from "../../assets/ChatAssets/Ellipse 3.png";
import EmojiPicker from "emoji-picker-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaFaceSmile } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
const ChatRight = () => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [inputValue, setinputValue] = useState("");

  function handleEmoji(argu) {
    setinputValue((prevstate) => {
      return prevstate + argu.emoji;
    });
  }

  function hanldemsgInput(event) {
    const { value } = event.target;
    setinputValue(value);
  }

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

      {/* === Chat Page === */}
      <div className="h-[70vh] overflow-y-scroll p-5">
        <div className="flex flex-col gap-y-8">
          <div className="w-[30%] self-start">
            <div className="box_left w-full rounded-xl bg-blue-500 py-5 text-center">
              <h3 className="flex justify-center break-words p-2 text-justify font-custom_poppins font-semibold text-white">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>
          <div className="w-[30%] self-end">
            <div className="box_right w-full rounded-xl bg-blue-500 py-5 text-center">
              <h3 className="flex justify-center break-words p-2 text-justify font-custom_poppins font-semibold text-white">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>
          <div className="w-[30%] self-end">
            <div className="box_right w-full rounded-xl bg-blue-500 py-5 text-center">
              <h3 className="flex justify-center break-words p-2 text-justify font-custom_poppins font-semibold text-white">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>
          <div className="w-[30%] self-start">
            <div className="box_left w-full rounded-xl bg-blue-500 py-5 text-center">
              <h3 className="flex justify-center break-words p-2 text-justify font-custom_poppins font-semibold text-white">
                Hey There !
              </h3>
            </div>
            <p>Today, 2:01pm</p>
          </div>
        </div>
      </div>

      {/* === Chat Page === */}

      {/* === type chat === */}
      <div className="flex w-full gap-x-2 py-4">
        <input
          type="text"
          id="message"
          name="message"
          className="w-[90%] rounded-xl bg-gray-300 px-6 py-5"
          placeholder="Write your message"
          onChange={hanldemsgInput}
          value={inputValue}
        />
        <button className="cursor-pointer text-2xl text-[#707070]">
          <FaRegSmile
            onClick={() => {
              setshowEmojiPicker(!showEmojiPicker);
            }}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-[13%] right-[13%] z-50">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </button>
        <button className="cursor-pointer text-2xl text-[#707070]">
          <IoCameraOutline />
        </button>
        <button className="rounded-xl bg-[#5F35F5] px-4 text-2xl text-white">
          <RiSendPlaneFill />
        </button>
      </div>
      {/* === type chat === */}
    </>
  );
};

export default ChatRight;
