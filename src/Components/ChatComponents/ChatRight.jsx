import React, { useState } from "react";
import avatar from "../../assets/ChatAssets/Ellipse 3.png";
import EmojiPicker from "emoji-picker-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaFaceSmile } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set } from "firebase/database";
import { GetTimeNow } from "../../../Utils/Moments/Moment";
import ModalComponents from "../CommonComponents/ModalComponents/ModalComponents.jsx";
const ChatRight = () => {
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const db = getDatabase();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleEmoji(argu) {
    setinputValue((prevstate) => {
      return prevstate + argu.emoji;
    });
  }

  function hanldemsgInput(event) {
    const { value } = event.target;
    setinputValue(value);
  }

  const { friendsItem } = useSelector((state) => state.friendStore);

  // hanldeMessageSend function

  function hanldeMessageSend() {
    if (inputValue) {
      set(push(ref(db, "singleMsg/")), {
        msg: inputValue,
        createdAt: GetTimeNow(),
      })
        .then(() => {
          console.log("msg sent");
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setinputValue("");
        });
    }
  }

  return (
    <>
      <div className="flex items-center justify-between border-b-2 border-b-[rgb(0,0,0,.25)]">
        <div className="flex items-center gap-x-[33px]">
          <picture>
            <img
              className="rounded-full"
              src={friendsItem.whoSendFriendRequestProfilePicture || avatar}
              alt={friendsItem.whoSendFriendRequestProfilePicture || avatar}
            />
          </picture>
          <div className="flex flex-col text-xl capitalize">
            <h3>{friendsItem.whoSendFriendRequestName || "Empty"} </h3>
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
        <button
          onClick={() => openModal()}
          className="cursor-pointer text-2xl text-[#707070]"
        >
          <IoCameraOutline />
        </button>
        <button
          onClick={hanldeMessageSend}
          className="rounded-xl bg-[#5F35F5] px-4 text-2xl text-white"
        >
          <RiSendPlaneFill />
        </button>
      </div>

      <ModalComponents
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      >
        <div class="flex w-full items-center justify-center">
          <label
            for="dropzone-file"
            class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 dark:hover:bg-gray-800"
          >
            <div class="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>

        <button>Send</button>
      </ModalComponents>
      {/* === type chat === */}
    </>
  );
};

export default ChatRight;
