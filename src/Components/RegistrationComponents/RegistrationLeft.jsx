import React, { useState } from "react";
import { CSSProperties } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { EmailValidator } from "../../../Utils/Validation";
import { FullNameValidator } from "../../../Utils/Validation";
import { PasswordValidator } from "../../../Utils/Validation";
import { toast, Zoom } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const RegistrationLeft = () => {
  const auth = getAuth();
  const [fullemail, setfullemail] = useState("");
  const [fullfullname, setfullfullname] = useState("");
  const [fullpassword, setfullpassword] = useState("");
  const [eyeopen, seteyeopen] = useState(false);
  const [loading, setloading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  // for error
  const [fullemailError, setfullemailError] = useState("");
  const [fullfullnameError, setfullfullnameError] = useState("");
  const [fullpasswordError, setfullpasswordError] = useState("");

  /**
   * todo : handleEmail function implement
   * @param({event})
   */

  const handleEmail = (event) => {
    setfullemail(event.target.value);
  };
  /**
   * todo : handleFullName function implement
   * @param({event})
   */

  const handleFullName = (event) => {
    setfullfullname(event.target.value);
  };
  /**
   * todo : handlePassword function implement
   * @param({event})
   */

  const handlePassword = (event) => {
    setfullpassword(event.target.value);
  };

  /**
   * todo : handleEye function implement
   */
  const handleEye = () => {
    seteyeopen(!eyeopen);
  };

  /**
   * todo: handleSubmit function implement
   */

  const handleSubmit = () => {
    if (!fullemail || !EmailValidator(fullemail)) {
      setfullemailError("Email is missing or wrong mail");
    } else if (!fullfullname || !FullNameValidator(fullfullname)) {
      setfullemailError("");
      setfullfullnameError(
        "Full name is missing or character must be 20 words",
      );
    } else if (!fullpassword || !PasswordValidator(fullpassword)) {
      setfullfullnameError("");
      setfullpasswordError("Password is missing or criteria not fulfilled");
    } else {
      setfullpasswordError("");
      setloading(true);
      createUserWithEmailAndPassword(auth, fullemail, fullpassword)
        .then((userInfo) => {
          toast.success(`${fullfullname} Registration Done`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
        })
        .catch((err) => {
          let ourError = err.message.split("/")[1];
          toast.error(ourError.slice(0, ourError.length - 2), {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Zoom,
          });
        })
        .finally(() => {
          setloading(false);
        });
    }
  };

  return (
    <>
      <div className="h-screen w-[60%]">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col gap-y-[61.5px]">
            <div>
              <h1 className="font-nunito text-[34.4px] font-semibold text-auth_primary_Color">
                Get started with easily register
              </h1>
              <p className="font-nunito text-[20.64px] font-normal text-auth_secondary_Color">
                Free register and you can enjoy it
              </p>
            </div>

            <div className="flex flex-col gap-y-[56px]">
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
                      onChange={handleEmail}
                      className="py-3 font-nunito"
                      placeholder="abcd@gmail.com"
                    />
                  </fieldset>
                  <span className="font-nunito text-sm text-red-500">
                    {fullemailError}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-start gap-y-4">
                <div>
                  <fieldset className="rounded-lg border-2 border-auth_secondary_Color px-4">
                    <legend className="px-4 font-nunito text-[14px] font-normal text-auth_primary_Color">
                      Full name
                    </legend>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleFullName}
                      className="py-3 font-nunito"
                      placeholder="Khalid Bin Alam Pronoy"
                    />
                  </fieldset>
                  <span className="font-nunito text-sm text-red-500">
                    {fullfullnameError}
                  </span>
                </div>
              </div>
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
                        id="pasoword"
                        onChange={handlePassword}
                        className="py-3"
                        placeholder="..........."
                      />

                      <span className="cursor-pointer" onClick={handleEye}>
                        {eyeopen ? <BsFillEyeSlashFill /> : <IoEyeSharp />}
                      </span>
                    </div>
                  </fieldset>
                  <span className="font-nunito text-sm text-red-500">
                    {fullpasswordError}
                  </span>
                </div>
              </div>
              <div className="cursor-pointer" onClick={handleSubmit}>
                <button className="w-full rounded-full bg-gradient-to-r from-[#662D8C] to-[#ED1E79] py-5 text-[20.64px] font-semibold text-white">
                  {loading ? (
                    <BeatLoader
                      color={color}
                      loading={loading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>
              <div className="flex justify-center">
                Already have an account ?
                <span className="text-[#EA6C00]"> Sign In</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationLeft;
