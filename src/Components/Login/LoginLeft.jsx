import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

import { PasswordValidator } from "../../../Utils/Validation";
import { EmailValidator } from "../../../Utils/Validation";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { SucessToast, ErrorToast, InfoToast } from "../../../Utils/Toast.js";
import { DNA } from "react-loader-spinner";

const LoginLeft = () => {
  const auth = getAuth();

  const [eyeopen, seteyeopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [loginInfo, setloginInfo] = useState({
    email: "",
    passoword: "",
  });

  // all error state
  const [LoginError, setLoginError] = useState({
    emailError: "",
    passowordError: "",
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

  function handleLoginSubmit() {
    const { email, passoword } = loginInfo;
    if (!email || !EmailValidator(email)) {
      setLoginError({
        ...LoginError,
        emailError: "Email is missing or wrong mail",
      });
    } else if (!passoword || !PasswordValidator(passoword)) {
      setLoginError({
        ...LoginError,
        emailError: "",

        passowordError: "Password is wrong",
      });
    } else {
      setloading(true);
      signInWithEmailAndPassword(auth, email, passoword)
        .then((userInfo) => {
          SucessToast(`Login successful`);
        })
        .catch((err) => {
          ErrorToast(`${err.code}`);
        })
        .finally(() => {
          setloading(false);
          setLoginError({
            ...LoginError,
            emailError: "",
            passowordError: "",
          });
        });
    }
  }

  /**
   * todo : HandleLoginWithGoogle function implement
   * @param({})
   */

  function HandleLoginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        return user;
      })
      .then((user) => {
        console.log(user.reloadUserInfo);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
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
            <div
              onClick={HandleLoginWithGoogle}
              className="cursor-pointer rounded-xl border-[1px] border-gray-300 px-4 py-5"
            >
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
                    {LoginError.emailError}
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
                  <span className="font-nunito text-sm text-red-500">
                    {LoginError.passowordError}
                  </span>
                </div>
              </div>
              {loading ? (
                <div className="cursor-pointer">
                  {loading ? "" : ""}
                  <button className="w-full rounded-full bg-gradient-to-r from-[#662D8C] to-[#ED1E79] py-4 text-[20.64px] font-semibold text-white">
                    <span className="flex items-center justify-center">
                      <DNA
                        visible={true}
                        height="40"
                        width="60"
                        ariaLabel="dna-loading"
                      />
                    </span>
                  </button>
                </div>
              ) : (
                <div className="cursor-pointer" onClick={handleLoginSubmit}>
                  {loading ? "" : ""}
                  <button className="w-full rounded-full bg-gradient-to-r from-[#662D8C] to-[#ED1E79] py-4 text-[20.64px] font-semibold text-white">
                    Login to Continue
                  </button>
                </div>
              )}

              <div className="flex justify-center">
                <p className="px-4 font-nunito text-[14px]">
                  Don’t have an account ?{" "}
                  <Link to="/registration">
                    <span className="text-[#EA6C00] hover:underline">
                      {" "}
                      Sign up
                    </span>
                  </Link>
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
