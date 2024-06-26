import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const LoginLeft = () => {
  const [eyeopen, seteyeopen] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: "",
    passoword: "",
  });

  /**
   * todo : handleLoginInput
   */

  function handleLoginInput(e) {
    setloginInfo({
      ...loginInfo,
      [e.target.id]: e.target.value,
    });
  }
  return (
    <>
      <div className="h-screen w-[60%]">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col gap-y-[61.5px]">
            <div>
              <h1 className="font-nunito text-[34.4px] font-semibold text-auth_primary_Color">
                Login to your account!
              </h1>
            </div>
            <div className="cursor-pointer rounded-xl border-[1px] border-gray-300 px-4 py-5">
              <button className="flex items-center gap-x-3 text-[18px] font-semibold text-auth_primary_Color">
                <FcGoogle className="text-3xl" />
                Login with Google
              </button>
            </div>

            <div className="flex flex-col gap-y-[30px]">
              <div className="flex flex-col justify-start gap-y-4">
                <div>
                  <fieldset className="rounded-lg border-2 border-auth_secondary_Color px-4">
                    <legend className="px-4 font-nunito text-[14px] font-normal text-auth_primary_Color">
                      Email
                    </legend>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={handleLoginInput}
                      className="py-3 font-nunito"
                      placeholder="abcd@gmail.com"
                    />
                  </fieldset>
                  <span className="font-nunito text-sm text-red-500">
                    {/* {fullemailError} */}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-start gap-y-4"></div>
              <div className="flex flex-col justify-start gap-y-4">
                <div>
                  <fieldset className="rounded-lg border-2 border-auth_secondary_Color px-4">
                    <legend className="px-4 font-nunito text-[14px] font-normal text-auth_primary_Color">
                      Password
                    </legend>

                    <div className="flex items-center justify-between">
                      <input
                        type={eyeopen ? "text" : "password"}
                        name="password"
                        id="passoword"
                        onChange={handleLoginInput}
                        className="py-3"
                        placeholder="..........."
                      />

                      <span
                        className="cursor-pointer"
                        onClick={() => seteyeopen(!eyeopen)}
                      >
                        {eyeopen ? <BsFillEyeSlashFill /> : <IoEyeSharp />}
                      </span>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div className="cursor-pointer">
                <button className="w-full rounded-full bg-gradient-to-r from-[#662D8C] to-[#ED1E79] py-5 text-[20.64px] font-semibold text-white">
                  Login to Continue
                </button>
              </div>
              <div className="flex justify-center">
                <p className="px-4 font-nunito text-[14px]">
                  Don’t have an account ?{" "}
                  <span className="text-[#EA6C00] hover:underline">
                    {" "}
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginLeft;
