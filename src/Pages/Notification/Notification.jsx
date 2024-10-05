import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
} from "../../Features/Redux/AllSlice/slice";

const Notification = () => {
  const { counterReducer } = useSelector((state) => state);
  const [inputValue, setinputValue] = useState();

  const dispatch = useDispatch();

  function handleIncrement(input) {
    dispatch(increment(Number(input)));
  }

  function handleDecrement(input) {
    dispatch(decrement(Number(input)));
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <p className="text-2xl">{counterReducer.value} </p>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => {
          setinputValue(e.target.value);
        }}
      />
      <div className="flex">
        <button
          type="button"
          class="mb-2 me-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
          onClick={() => {
            handleDecrement(inputValue);
          }}
        >
          decrement
        </button>
        <button
          type="button"
          class="mb-2 me-2 rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
          onClick={() => {
            handleIncrement(inputValue);
          }}
        >
          Increment
        </button>
        <button
          type="button"
          class="mb-2 me-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Notification;
