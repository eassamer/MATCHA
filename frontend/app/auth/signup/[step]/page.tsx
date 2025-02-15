"use client";
import { Form } from "@/components/auth/Form";
import { Button } from "@/components/shared/Button";
import { usePathname } from "next/navigation";
import { HiCamera } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DatePicker } from "@/components/shared/DatePicker";

const Email = () => {
  const emailFormFields = [{ label: "Email", type: "email", required: true }];
  const passwordFormFields = [
    { label: "Password", type: "password", required: true },
    { label: "Confirm Password", type: "password", required: true },
  ];

  return (
    <div className="flex flex-col justify-center gap-4">
      <Form
        formFields={emailFormFields}
        className="w-full justify-center items-center"
      />
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
  ];

  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:justify-normal gap-4 w-full">
        <div className="relative flex flex-col justify-center items-center w-[80px] h-[80px] lg:hidden">
          <Image
            src={"/avatar.jpg"}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-[25px]"
          />
          <button
            className="absolute bottom-0 right-0 bg-primary border-white border-2 rounded-full h-[30px] w-[30px] flex justify-center items-center"
            onClick={() => console.log("Change Avatar")}
          >
            <HiCamera className="text-[20px] text-white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:gap-8">
        <Form
          formFields={formFields}
          className="gap-4 pt-4 lg:pt-0 lg:flex-row"
        />
        <Form
          formFields={displayNameField}
          className="gap-4 pt-4 lg:pt-0 justify-center"
        />
        <div className="w-full flex justify-center items-center py-10 lg:hidden">
          <DatePicker />
        </div>
      </div>
    </div>
  );
};

const ProfileDetailsLarge = () => {
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="relative flex flex-col justify-center items-center w-[80px] h-[80px]">
          <Image
            src={"/avatar.jpg"}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-[25px]"
          />
          <button
            className="absolute bottom-0 right-0 bg-primary border-white border-2 rounded-full h-[30px] w-[30px] flex justify-center items-center"
            onClick={() => console.log("Change Avatar")}
          >
            <HiCamera className="text-[20px] text-white" />
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center py-10">
        <DatePicker />
      </div>
    </div>
  );
};

const IAmA = () => {
  const genders = ["Woman", "Man", "Other"];
  const [selectedGender, setSelectedGender] = useState("");
  return (
    <div className="lg:px-[25%]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {genders.map((gender, index) => {
            return (
              <div key={index}>
                <label
                  className={`flex border-2 border-black border-opacity-10 rounded-[15px] p-4  hover:bg-pink-500
                  hover:text-white
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    gender === selectedGender
                      ? "bg-primary text-white font-bold"
                      : ""
                  } cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="sex"
                    value={gender}
                    onChange={(e) => {
                      setSelectedGender(e.target.value);
                    }}
                    className="hidden"
                  />
                  <span className="flex justify-between w-full">
                    {gender}
                    <FaCheck className="text-slate-200 text-[20px]" />
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

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
