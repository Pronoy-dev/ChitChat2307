import React from "react";

const RegistrationLeft = () => {
  return (
    <>
      <div className="h-screen w-[60%]">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col gap-y-[61.5px]">
            <div>
              <h1 className="text-auth_primary_Color font-nunito text-[34.4px] font-semibold">
                Get started with easily register
              </h1>
              <p className="text-auth_secondary_Color font-nunito text-[20.64px] font-normal">
                Free register and you can enjoy it
              </p>
            </div>

            <div className="flex flex-col gap-y-[56px]">
              <div className="flex flex-col justify-start gap-y-4">
                <fieldset className="border-auth_secondary_Color rounded-lg border-2 px-4">
                  <legend className="font-nunito text-auth_primary_Color px-4 text-[14px] font-normal">
                    Email
                  </legend>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="font-nunito py-3"
                    placeholder="abcd@gmail.com"
                  />
                </fieldset>
              </div>
              <div className="flex flex-col justify-start gap-y-4">
                <fieldset className="border-auth_secondary_Color rounded-lg border-2 px-4">
                  <legend className="font-nunito text-auth_primary_Color px-4 text-[14px] font-normal">
                    Full name
                  </legend>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="font-nunito py-3"
                    placeholder="Khalid Bin Alam Pronoy"
                  />
                </fieldset>
              </div>
              <div className="flex flex-col justify-start gap-y-4">
                <fieldset className="border-auth_secondary_Color rounded-lg border-2 px-4">
                  <legend className="font-nunito text-auth_primary_Color px-4 text-[14px] font-normal">
                    Password
                  </legend>
                  <input
                    type="password"
                    name="password"
                    id="pasoword"
                    className="py-3"
                    placeholder="..........."
                  />
                </fieldset>
              </div>
              <div>
                <button className="w-full rounded-full bg-gradient-to-r from-[#662D8C] to-[#ED1E79] py-5 text-[20.64px] font-semibold text-white">
                  Sign up
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
