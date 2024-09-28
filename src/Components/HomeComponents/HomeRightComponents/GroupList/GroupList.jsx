import React, { useState, createRef } from "react";
import Cropper from "react-cropper";
import { getDatabase, push, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as ourStorageRef,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import "cropperjs/dist/cropper.css";
import { v4 as uuidv4 } from "uuid";
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
import GroupImg from "../../../../assets/HomeAssets/HomeRightAssets/GroupListAssets/g1.gif";
import { ErrorToast, SucessToast } from "../../../../../Utils/Toast";
import ModalComponents from "../../../CommonComponents/ModalComponents/ModalComponents";
const GroupList = () => {
  const storage = getStorage();
  const db = getDatabase();
  const auth = getAuth();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const [groupInfo, setgroupInfo] = useState({
    groupName: "",
    groupTagName: "",
  });
  const [groupNameError, setgroupNameError] = useState("");
  const [groupTagNameError, setgroupTagNameError] = useState("");
  const [cropDataError, setcropDataError] = useState("");
  const [loading, setloading] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //  image onChange handler
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  // onChange for input value
  function handleGroupInput(event) {
    const { id, value } = event.target;
    setgroupInfo({
      ...groupInfo,
      [id]: value,
    });
  }

  console.log();

  // handleCreateGroup function implement

  function handleCreateGroup() {
    const { groupName, groupTagName } = groupInfo;
    if (!groupName) {
      setgroupNameError("Group Name is missing");
    } else if (!groupTagName) {
      setgroupNameError("");
      setgroupTagNameError("Group Tag Name is missing");
    } else if (!cropData) {
      setgroupTagNameError("");
      setcropDataError("Please crop the image");
    } else {
      setloading(true);
      const storageRef = ourStorageRef(
        storage,
        `groupImage${uuidv4().split("-")[0]}`,
      );
      uploadString(storageRef, cropData, "data_url")
        .then((snapshot) => {
          const { metadata } = snapshot;
          console.log("Uploaded a data_url string!", metadata);
          return metadata?.fullPath;
        })
        .then((imagePath) => {
          return getDownloadURL(ourStorageRef(storage, imagePath));
        })
        .then((downloadUrl) => {
          console.log(downloadUrl);
          set(push(ref(db, "group/")), {
            groupName,
            groupTagName,
            groupImage: downloadUrl,
            whoCreateGroupUid: auth.currentUser.uid,
            whoCreateGroupName: auth.currentUser.displayName,
            whoCreateGroupEmail: auth.currentUser.email,
            whoCreateGroupProfile_picture: auth.currentUser.photoURL
              ? auth.currentUser.photoURL
              : "",
          });
        })

        .catch((err) => {
          ErrorToast(`Error from ${err.code}`, "top-left");
        })
        .finally(() => {
          setgroupInfo({
            groupName: "",
            groupTagName: "",
          });
          setloading(false);
          closeModal();
        });
    }
  }

  return (
    <>
      <div className="mt-5 h-[360px] w-[32%] rounded-xl px-3 py-2 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="font-custom_poppins text-xl font-semibold">
            Groups List
          </span>

          <button
            className="mr-2 cursor-pointer rounded-xl bg-primaryBlue px-[22px] py-1 font-custom_poppins text-xl font-semibold text-white"
            onClick={() => openModal()}
          >
            Create Group
          </button>
        </div>
        <div className="mt-3 flex h-[85%] flex-col gap-y-5 overflow-y-scroll scrollbar-thin">
          {[...new Array(10)].map((_, index) => (
            <div className="flex items-center justify-between border-b-2 border-b-[#000000] border-opacity-[20%] pb-3">
              <div className="h-[70px] w-[70px] rounded-full shadow-lg">
                <picture>
                  <img
                    src={GroupImg}
                    alt={GroupImg}
                    className="h-full w-full rounded-full object-contain"
                  />
                </picture>
              </div>
              <div className="flex w-[50%] flex-col items-center justify-center text-wrap text-justify">
                <h1 className="font-custom_poppins text-lg font-semibold text-textPrimaryColor">
                  Friends Reunion
                </h1>
                <span className="font-custom_poppins text-[14px] font-medium text-[#4D4D4D] opacity-[75%]">
                  Hi Guys, Wassup!
                </span>
              </div>
              <div>
                <button className="mr-2 cursor-pointer rounded-xl bg-primaryBlue px-[22px] py-1 font-custom_poppins text-xl font-semibold text-white">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
        <ModalComponents
          openModal={openModal}
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
        >
          <div className="mt-10 h-[80vh] w-[80vw] overflow-y-scroll">
            <form action="#" method="post" onSubmit={(e) => e.preventDefault()}>
              {" "}
              <div className="flex flex-col items-start gap-y-2">
                <label
                  htmlFor="groupName"
                  className="font-custom_poppins text-xl"
                >
                  groupName
                  <span className="text-red-700">*</span>
                </label>

                <input
                  className="w-full rounded-lg border border-red-200 bg-gray-200 px-2 py-3"
                  type="text"
                  id="groupName"
                  name="groupName"
                  value={groupInfo.groupName}
                  onChange={handleGroupInput}
                  placeholder="Enter your group name"
                />
              </div>
              <span className="font-nunito text-sm text-red-500">
                {groupNameError}
              </span>
              <div className="mt-5 flex flex-col items-start gap-y-2">
                <label
                  htmlFor="groupTagName"
                  className="font-custom_poppins text-xl"
                >
                  groupTagName
                  <span className="text-red-700">*</span>
                </label>

                <input
                  className="w-full rounded-lg border border-red-200 bg-gray-200 px-2 py-3"
                  type="text"
                  id="groupTagName"
                  name="groupTagName"
                  value={groupInfo.groupTagName}
                  onChange={handleGroupInput}
                  placeholder="Enter your group tag name"
                />
                <span className="font-nunito text-sm text-red-500">
                  {groupTagNameError}
                </span>
              </div>
              {/* ========= cropper jsx ========= */}
              <div>
                <div className="my-10 w-[30%]">
                  <input type="file" onChange={onChange} />
                </div>
                <div className="relative flex gap-x-5">
                  <div className="w-[33%]">
                    <Cropper
                      ref={cropperRef}
                      zoomTo={0.5}
                      style={{ height: 365, width: "100%" }}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      guides={true}
                    />
                  </div>

                  <h1 className="absolute left-[35%] top-[-50px] bg-green-500 px-10 py-2 text-white">
                    Preview
                  </h1>
                  <div className="box h-[365px] w-[32%] overflow-hidden bg-blue-500">
                    <div className="img-preview h-[365px] w-[100%]" />
                  </div>
                  <button
                    className="absolute left-[62%] top-[-60px] h-10 w-40 bg-red-500"
                    onClick={getCropData}
                  >
                    Crop Image
                  </button>
                  <div className="box h-[365px] w-[32%] bg-red-500">
                    <img
                      className="h-[365px] w-full"
                      src={cropData}
                      alt="cropped"
                    />
                  </div>
                </div>
              </div>
              {/* ========= cropper jsx ========= */}
              <span className="font-nunito text-sm text-red-500">
                {cropDataError}
              </span>
              <div className="my-10">
                {loading ? (
                  <button className="w-full rounded-xl bg-blue-300 py-3 font-custom_poppins font-bold text-white">
                    {" "}
                    loading...
                  </button>
                ) : (
                  <button
                    className="w-full rounded-xl bg-blue-300 py-3 font-custom_poppins font-bold text-white"
                    onClick={handleCreateGroup}
                  >
                    {" "}
                    Create Group
                  </button>
                )}
              </div>
            </form>
          </div>
        </ModalComponents>
      </div>
    </>
  );
};

export default GroupList;
