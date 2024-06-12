import React from "react";
import RegistrationRightImg from "../../assets/RegistrationAssets/signUp.png";
const RegistrationRight = () => {
  return (
    <>
      <div className="w-[40%]">
        <picture>
          <img
            src={RegistrationRightImg}
            alt={RegistrationRightImg}
            className="h-screen w-full"
          />
        </picture>
      </div>
    </>
  );
};

export default RegistrationRight;
