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
import { ErrorToast } from "../../../Utils/Toast.js";
import { getAuth } from "firebase/auth";
import ModalComponents from "../CommonComponents/ModalComponents/ModalComponents.jsx";
import {
  getStorage,
  ref as uploadImageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const ChatRight = () => {
  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [image, setimage] = useState(null);

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

  /**
   * todo : handleUploadImage function
   * @param({})
   */

  const handleUploadImage = (event) => {
    setimage(event.target.files[0]);
  };
  /**
   * todo : handleSentImage function
   * @param({})
   */

  const handleSentImage = (event) => {
    if (!image) {
      ErrorToast("First upload an image");
    }
    if (
      image.type !== "image/png" ||
      "image/gif" ||
      "image/jpeg" ||
      "image/webp"
    ) {
      ErrorToast("Img format is not acceptable");
    }

    const storageRef = uploadImageRef(storage, "images/" + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error from upload image", error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      },
    );
  };

  return (
    <>
      <div className="flex items-center justify-between border-b-2 border-b-[rgb(0,0,0,.25)]">
        <div className="flex items-center gap-x-[33px]">
          <picture>
            {auth.currentUser ? (
              <img
                className="rounded-full"
                src={
                  auth.currentUser.uid === friendsItem.whoSendFriendRequestUid
                    ? friendsItem.whoRecivedFriendRequestProfilePicture
                    : friendsItem.whoSendFriendRequestProfilePicture || avatar
                }
                alt={
                  auth.currentUser.uid === friendsItem.whoSendFriendRequestUid
                    ? friendsItem.whoRecivedFriendRequestProfilePicture
                    : friendsItem.whoSendFriendRequestProfilePicture
                }
              />
            ) : (
              <img className="rounded-full" src={avatar} alt="Avatar" />
            )}
          </picture>
          <div className="flex flex-col text-xl capitalize">
            {auth.currentUser ? (
              <h3>
                {auth.currentUser.uid === friendsItem.whoSendFriendRequestUid
                  ? friendsItem.whoRecivedFriendRequestName
                  : friendsItem.whoSendFriendRequestName || "No Name"}
              </h3>
            ) : (
              <h3> No name </h3>
            )}
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
        isChatPage={true}
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      >
        <div>
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
          </div>
          <button
            className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white"
            onClick={handleSentImage}
          >
            Send
          </button>
        </div>
      </ModalComponents>
      {/* === type chat === */}
    </>
  );
};

export default ChatRight;
