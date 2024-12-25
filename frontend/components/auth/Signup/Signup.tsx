import React from "react";
import { Media } from "./Media";
import { SignUpOptions } from "./SignUpOptions";
import { TermsAndPolicy } from "./TermsAndPolicy";




export const SignUp = () => {
    return (
        <div className="
            flex
            px-12 
            flex-col
            lg:flex-row
            items-center
            gap-12
            h-full
            w-full
            overflow-scroll
            lg:overflow-auto">
            <Media />
            <div className="
                flex
                flex-col
                gap-12">
                <SignUpOptions />
                {/* <div className="h-1/6"></div> */}
                <TermsAndPolicy />
            </div>
        </div>
    );
}