import React from "react";
import { FcSearch } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";

const Search = ({ classname = "py-5" }) => {
  return (
    <>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-[50%]">
          <FcSearch />
        </span>
        <input
          type="text"
          id="search"
          name="search"
          className={classname}
          placeholder="search"
        />
        <span className="absolute right-5 top-1/2 -translate-y-[50%] text-primaryBlue">
          <BsThreeDotsVertical />
        </span>
      </div>
    </>
  );
};

export default Search;
