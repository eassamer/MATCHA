"use client";
import { Button } from "@/components/shared/Button";
import React, { useEffect, useState } from "react";
import Email from "@/components/auth/Signup/Email";
import ProfileDetails from "@/components/auth/Signup/ProfileDetails";
import ProfileDetailsLarge from "@/components/auth/Signup/ProfileDetailsLarge";
import IAmA from "@/components/auth/Signup/IAmA";
import Interests from "@/components/auth/Signup/Interests";
import { usePathname, useRouter } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const step = Number.isNaN(parseInt(pathname.split("/")[3]))
    ? 1
    : parseInt(pathname.split("/")[3]);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    if (!isLargeScreen && step === 3 && steps[step - 1] === "Profile details") {
      router.push("/auth/signup/2");
    }
    //eslint-disable-next-line
  }, [isLargeScreen]);

  const nextStep = () => {
    if (step === steps.length) {
      console.log("Submit");
      return;
    } else router.push("/auth/signup/" + (step + 1));
  };

  const prevStep = () => {
    if (step === 1) {
      return;
    }
    router.push("/auth/signup/" + (step - 1));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nextStep();
  };

  const renderFields = () => {
    if (!isLargeScreen) {
      switch (step) {
        case 1:
          return <Email />;
        case 2:
          return <ProfileDetails />;
        case 3:
          return <IAmA />;
        case 4:
          return <Interests />;
        default:
          return <Email />;
      }
    } else {
      switch (step) {
        case 1:
          return <Email />;
        case 2:
          return <ProfileDetails />;
        case 3:
          return <ProfileDetailsLarge />;
        case 4:
          return <IAmA />;
        case 5:
          return <Interests />;
        default:
          return <Email />;
      }
    }
  };

  return (
    <div className="px-12 flex flex-col sm:relative lg:static justify-between lg:justify-around h-screen lg:h-full gap-8">
      <div className="lg:gap-8">
        <div className="flex flex-col lg:flex-row lg:justify-between w-full h-fit pb-16 lg:pb-8">
          <div className="font-extrabold text-[30px] absolute lg:static top-20">
            {step ? steps[(step - 1) % steps.length] : "Sign Up"}
          </div>
          <button
            className={`text-primary font-extrabold font-montserrat py-12 lg:py-0 cursor-pointer ${
              steps[step - 1] !== "Your Interests" ? "opacity-0" : ""
            }`}
            onClick={nextStep}
            disabled={steps[step - 1] !== "Your Interests"}
          >
            <span className="absolute lg:static right-12 top-8">Skip</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 sm:flex-none overflow-y-auto lg:overflow-y-auto max-h-[50vh] sm:max-h-[60vh] sm:overflow-y-hidden">
          {renderFields()}
          <button className="hidden" type="submit"></button>
        </form>
      </div>
      <div className="flex lg:flex-row flex-col gap-3 lg:static sm:absolute bottom-4 left-0 sm:px-12 sm:pb-0 pb-3 justify-around w-full">
        <div className="text-red-500 font-bold text-center">{errorMessage}</div>
        <Button
          type={false}
          className={`font-bold ${
            step === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          disabled={step === 1}
          onClick={prevStep}
        >
          Go Back
        </Button>
        <Button
          type={true}
          className="font-bold"
          onClick={nextStep}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Page;
