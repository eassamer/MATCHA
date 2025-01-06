'use client';
import React from "react";
import { Media } from "./Media";
import { SignUpOptions } from "./SignUpOptions";
import { TermsAndPolicy } from "./TermsAndPolicy";

export const SignUp = () => {
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
      <div className="lg:w-1/2 pt-10">
        <Media />
      </div>
      <div
        className="
                flex
                flex-col
                justify-around
                h-full
                w-full
                gap-5
                lg:h-fit
                lg:px-10
                lg:w-1/2
                "
      >
        <SignUpOptions />
        <TermsAndPolicy />
      </div>
    </div>
  );
};
