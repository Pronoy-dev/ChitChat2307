import React from "react";
import { Link } from "react-router-dom";

const NotVerified = ({ userInfo }) => {
  const { email, displayName } = userInfo;
  /**
   * todo : handleGoToMail function implement
   */

  return (
    <div>
      <div className="flex h-[96vh] w-[97vw] items-center rounded-2xl bg-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
          <div className="max-w-md">
            <div className="font-dark text-5xl font-bold">
              {displayName.toUpperCase()}
            </div>
            <p className="pt-6 text-2xl font-light leading-normal md:text-3xl">
              Please Verify Your Email {email}
            </p>

            <button className="focus:shadow-outline-blue mt-6 inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none active:bg-blue-600">
              <Link
                to="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                target="_blank"
              >
                Go To Mail
              </Link>
            </button>
          </div>
          <div className="max-w-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default NotVerified;
