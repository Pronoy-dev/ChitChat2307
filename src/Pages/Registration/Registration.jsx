import React from "react";
import RegistrationLeft from "../../Components/RegistrationComponents/RegistrationLeft";
import RegistrationRight from "../../Components/RegistrationComponents/RegistrationRight";

const Registration = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-between">
        <RegistrationLeft />
        <RegistrationRight />
      </div>
    </>
  );
};

export default Registration;
