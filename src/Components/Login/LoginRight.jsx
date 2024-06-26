import React from "react";
import Login from "../../assets/LoginAssets/Login.gif";
const LoginRight = () => {
  return (
    <>
      <div className="w-[40%]">
        <picture>
          <img src={Login} alt={Login} className="h-screen w-full" />
        </picture>
      </div>
    </>
  );
};

export default LoginRight;
