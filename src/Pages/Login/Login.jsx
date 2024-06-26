import React from "react";
import LoginLeft from "../../Components/Login/LoginLeft";
import LoginRight from "../../Components/Login/LoginRight";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <LoginLeft />
        <LoginRight />
      </div>
    </>
  );
};

export default Login;
