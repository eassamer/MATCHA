"use client";
import { Form } from "@/components/auth/Form";
import { Button } from "@/components/shared/Button";
import { usePathname } from "next/navigation";
import { HiCamera } from "react-icons/hi2";

import React, { useState } from "react";
import Image from "next/image";

const Email = () => {
  const emailFormFields = [{ label: "Email", type: "email", required: true }];
  const passwordFormFields = [
    { label: "Password", type: "password", required: true },
    { label: "Confirm Password", type: "password", required: true },
  ];

  return (
    <div className="flex flex-col justify-center gap-4">
      <Form formFields={emailFormFields} className="w-full justify-center items-center"/>
      <Form formFields={passwordFormFields} className="gap-4" />
    </div>
  );
};

const ProfileDetails = () => {
  const formFields = [
    { label: "First Name", type: "text", required: true },
    { label: "Last Name", type: "text", required: true },
  ];
  const displayNameField = [
    { label: "Display Name", type: "text", required: true },
  ]

  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:justify-normal gap-4 w-full">
        <div className="relative flex flex-col justify-center items-center w-[80px] h-[80px] ">
          <Image
            src={"/avatar.jpg"}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-[25px]"
            />
          <button className="absolute bottom-0 right-0 bg-primary border-white border-2 rounded-full h-[30px] w-[30px] flex justify-center items-center" onClick={() => console.log("Change Avatar")}>
            <HiCamera className="text-[20px] text-white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:gap-8">
        <Form formFields={formFields} className="gap-4 pt-4 lg:pt-0 lg:flex-row" />
        <Form formFields={displayNameField} className="gap-4 pt-4 lg:pt-0 justify-center" />
      </div>
    </div>
  );
};

const Page = () => {
  const step = parseInt(usePathname().split("/")[3]);
  const steps = [
    "Sign Up",
    "Profile details",
    "Profile details",
    "I am a",
    "Your Interests",
  ];
  const [currentStep, setCurrentStep] = useState(step);

  const nextStep = () => {
    if (currentStep === 5) {
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
    switch (currentStep) {
      case 1:
        return <Email />;
      case 2:
        return <ProfileDetails />;
      case 3:
        return <div>Step 3 Fields</div>;
      case 4:
        return <div>Step 4 Fields</div>;
      case 5:
        return <div>Step 5 Fields</div>;
      default:
        return <Email />;
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
      <div className="flex gap-3 lg:static absolute bottom-4 left-0 px-12 justify-around w-full">
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
