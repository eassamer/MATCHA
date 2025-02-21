"use client";
import React, { useState } from "react";
import { Media } from "./Media";
import { SignUpOptions } from "./SignUpOptions";
import { TermsAndPolicy } from "../TermsAndPolicy";
import { BounceLoader } from "react-spinners";

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div
      className="
            flex
            px-12
            lg:px-0
            lg:justify-center
            flex-col
            lg:flex-row
            items-center
            h-full
            w-full
            lg:overflow-auto"
    >
      <div className={`lg:w-1/2 pt-10 ${isLoading ? "hidden" : ""}`}>
        <Media />
      </div>
      <div
        className={`flex flex-col justify-around h-full w-full gap-5 lg:h-fit lg:px-10 lg:w-1/2 ${
          isLoading ? "hidden" : ""
        }`}
      >
        <SignUpOptions setIsLoading={setIsLoading} />
        <TermsAndPolicy />
      </div>
      <div
        className={`flex justify-center items-center h-full w-full ${
          isLoading ? "" : "hidden"
        }`}
      >
        <BounceLoader color="#C13D88" />
      </div>
    </div>
  );
};
