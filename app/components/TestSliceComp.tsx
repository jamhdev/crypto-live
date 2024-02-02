"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { decrement, increment } from "../store/testSlice";

export default function TestSliceComp() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <div className="text-themeTextColor h-52 flex flex-col justify-center items-center gap-2">
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </>
  );
}
