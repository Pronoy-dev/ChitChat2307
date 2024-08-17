import React, { useState } from "react";
import Profile from "../../../assets/HomeAssets/HomeLeftAssets/Profile.png";
import Home from "../../../assets/HomeAssets/HomeLeftAssets/Home.gif";
import Chat from "../../../assets/HomeAssets/HomeLeftAssets/Chat.gif";
import Bell from "../../../assets/HomeAssets/HomeLeftAssets/Bell.gif";
import Settings from "../../../assets/HomeAssets/HomeLeftAssets/Settings.gif";
import Logout from "../../../assets/HomeAssets/HomeLeftAssets/Log-out.png";
import { NavLink, useLocation } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { SucessToast } from "../../../../Utils/Toast";
import { getAuth } from "firebase/auth";
const HomeLeft = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [profilePictureUpdate, setprofilePictureUpdate] = useState("");
  const db = getDatabase();
  const auth = getAuth();
  const [test, settest] = useState("home");

  const uploader = Uploader({
    apiKey: "free",
  });
  const options = {
    multi: true,
    editor: {
      images: {
        allowResizeOnMove: true,
        preview: true,
        crop: true,
        cropFilePath: (image) => {
          const { filePath } = image;
          console.log(filePath);

          return `${filePath}.crop`;
        },
        cropRatio: 4 / 3,
        cropShape: "circ",
      },
    },
  };

  /**
   * todo : get all users function
   * @param({})
   */

  const starCountRef = ref(db, "users/");
  onValue(starCountRef, (snapshot) => {
    snapshot.forEach((item) => {
      console.log({ ...item.val(), key: item.key });
    });
  });

  return (
    <>
      <div className="flex h-full w-[186px] flex-col items-center justify-start rounded-2xl bg-[#5F35F5]">
        <div className="shadowProfile relative">
          <picture>
            <img
              src={Profile}
              alt={Profile}
              className="my-12 h-[100px] w-[100px] rounded-full object-cover"
            />
          </picture>
          <div className="absolute left-[36%] top-[46%] z-10 cursor-pointer">
            <span>
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={(files) =>
                  set(ref(db, "users/"), {
                    usersProfile_picture: files[0].fileUrl,
                  }).then(() => {
                    SucessToast("Proflie Picture update done", "top-center");
                  })
                }
              >
                {({ onClick }) => (
                  <button onClick={onClick}>
                    <IoCloudUploadOutline className="text-4xl text-white" />
                  </button>
                )}
              </UploadButton>
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-12">
          <NavLink to="/">
            <div
              className={`${path == "" && "iconsShaded w-full cursor-pointer rounded-l-lg bg-white px-14 py-2"}`}
            >
              <picture>
                <img
                  src={Home}
                  alt={Home}
                  className="w-10 cursor-pointer mix-blend-multiply"
                />
              </picture>
            </div>
          </NavLink>
          <NavLink to={"/chat"}>
            <div
              className={`${path == "chat" && "iconsShaded w-full cursor-pointer rounded-l-lg bg-white px-14 py-2"}`}
            >
              <picture>
                <img
                  src={Chat}
                  alt={Chat}
                  className="w-10 cursor-pointer mix-blend-multiply"
                />
              </picture>
            </div>
          </NavLink>
          <NavLink to={"notification"}>
            <div
              className={`${path == "notification" && "iconsShaded w-full cursor-pointer rounded-l-lg bg-white px-14 py-2"}`}
            >
              <picture>
                <img
                  src={Bell}
                  alt={Bell}
                  className="w-10 cursor-pointer mix-blend-multiply"
                />
              </picture>
            </div>
          </NavLink>
          <NavLink to="/settings">
            <div
              className={`${path == "settings" && "iconsShaded w-full cursor-pointer rounded-l-lg bg-white px-14 py-2"}`}
            >
              <picture>
                <img
                  src={Settings}
                  alt={Settings}
                  className="w-10 cursor-pointer mix-blend-multiply"
                />
              </picture>
            </div>
          </NavLink>
        </div>
        <div className="pt-[83px]">
          <picture>
            <img src={Logout} alt={Logout} className="w-10 cursor-pointer" />
          </picture>
        </div>
      </div>
    </>
  );
};

export default HomeLeft;
