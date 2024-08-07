import React, { useEffect, useState } from "react";
import HomeLeft from "../HomeLeft/HomeLeft";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const auth = getAuth();
  const [isEmailVerified, setisEmailVerified] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setisEmailVerified(user.reloadUserInfo.emailVerified);
      console.log(user.reloadUserInfo.emailVerified);
    });
  }, [auth]);
  return (
    <>
      <div className="flex h-screen gap-x-10 bg-slate-200 p-9">
        {isEmailVerified && <HomeLeft />}
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
