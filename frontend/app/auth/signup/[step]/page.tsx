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
    { label: "Confirm Password", type: "confirm password", required: true },
  ];

  return (
    <div className="flex flex-col justify-center gap-4">
      <Form formFields={emailFormFields} />
      <Form formFields={passwordFormFields} className="gap-4" />
    </div>
  );
};

const ProfileDetails = () => {
  const formFields = [
    { label: "First Name", type: "text", required: true },
    { label: "Last Name", type: "text", required: true },
    { label: "Display Name", type: "text", required: true },
  ];

  return (
    <div>
      <div className="relative flex flex-col justify-center items-center w-full">
        <Image
          src={"/avatar.jpg"}
          alt="avatar"
          width={100}
          height={100}
          className="rounded-md"
          />
        <button className="absolute bottom-0 bg-primary rounded-full  h-[40px] w-[40px] flex justify-center items-center">
          <HiCamera className="text-[20px] text-white" />
        </button>
      </div>
      <Form formFields={formFields} className="gap-4" />
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
    <div className="px-12 flex flex-col justify-between h-fit gap-8">
      <div className="lg:gap-8">
        <div className="flex flex-col lg:flex-row w-full h-fit pb-12 ">
          <button
            className="text-primary font-extrabold font-montserrat py-12"
            onClick={nextStep}
          >
            <span className="absolute right-12">Skip</span>
          </button>
          <div className="font-extrabold text-[30px] lg:text-[34px]">
            {currentStep ? steps[(currentStep - 1) % steps.length] : "Sign Up"}
          </div>
        </div>
        {renderFields()}
      </div>
      <div className="flex gap-3 absolute lg:relative bottom-4 lg:bottom-0 left-0 px-12 justify-around w-full">
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
