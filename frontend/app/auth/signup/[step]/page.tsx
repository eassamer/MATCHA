"use client";
import { Button } from "@/components/shared/Button";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import Email from "@/components/auth/Signup/Email";
import ProfileDetails from "@/components/auth/Signup/ProfileDetails";
import ProfileDetailsLarge from "@/components/auth/Signup/ProfileDetailsLarge";
import IAmA from "@/components/auth/Signup/IAmA";



const Page = () => {
  const pathStep = parseInt(usePathname().split("/")[3]);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const steps = isLargeScreen
    ? [
        "Sign Up",
        "Profile details",
        "Profile details",
        "I am a",
        "Your Interests",
      ]
    : ["Sign Up", "Profile details", "I am a", "Your Interests"];

  const [currentStep, setCurrentStep] = useState(pathStep);

  useEffect(() => {
    if (!isLargeScreen && currentStep === 3) {
      setCurrentStep(2);
    }
  }, [isLargeScreen]);

  const nextStep = () => {
    if (currentStep === steps.length) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const renderFields = () => {
    if (!isLargeScreen) {
      switch (currentStep) {
        case 1:
          return <Email />;
        case 2:
          return <ProfileDetails />;
        case 3:
          return <IAmA />;
        case 4:
          return <div>Your Interests Fields</div>;
        default:
          return <Email />;
      }
    } else {
      switch (currentStep) {
        case 1:
          return <Email />;
        case 2:
          return <ProfileDetails />;
        case 3:
          return <ProfileDetailsLarge />;
        case 4:
          return <IAmA />;
        case 5:
          return <div>Your Interests Fields</div>;
        default:
          return <Email />;
      }
    }
  };

  return (
    <div className="px-12 flex flex-col relative lg:static justify-between lg:justify-around h-full gap-8">
      <div className="lg:gap-8">
        <div className="flex flex-col lg:flex-row lg:justify-between w-full h-fit pb-16 lg:pb-8">
          <div className="font-extrabold text-[30px] absolute lg:static top-20">
            {currentStep ? steps[(currentStep - 1) % steps.length] : "Sign Up"}
          </div>
          <button
            className="text-primary font-extrabold font-montserrat py-12 lg:py-0"
            onClick={nextStep}
          >
            <span className="absolute lg:static right-12 top-8">Skip</span>
          </button>
        </div>
        {renderFields()}
      </div>
      <div className="flex lg:flex-row flex-col gap-3 lg:static absolute bottom-4 left-0 px-12 justify-around w-full">
        {currentStep > 1 ? (
          <Button type={false} className="font-bold" onClick={prevStep}>
            Go Back
          </Button>
        ) : null}
        <Button type={true} className="font-bold" onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Page;
