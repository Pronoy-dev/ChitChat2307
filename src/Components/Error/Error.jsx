import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <div class="flex h-screen w-[80vw] flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center">
          <p class="mt-12 text-3xl text-gray-800 md:text-4xl lg:text-5xl">
            Page Not Found
          </p>
          <p class="mt-8 text-gray-600 md:text-lg lg:text-xl">
            Sorry, the page you are looking for could not be found.
          </p>
          <Link to="/">
            <a
              href="#"
              class="mt-12 flex items-center space-x-2 rounded bg-blue-600 px-4 py-2 text-gray-100 transition duration-150 hover:bg-blue-700"
              title="Return Home"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>Return Home</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
