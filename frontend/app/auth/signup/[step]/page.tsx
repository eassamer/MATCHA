"use client";
import { Button } from "@/components/shared/Button";
import React, { useContext, useEffect, useState } from "react";
import Email from "@/components/auth/Signup/Email";
import ProfileDetails from "@/components/auth/Signup/ProfileDetails";
import ProfileDetailsLarge from "@/components/auth/Signup/ProfileDetailsLarge";
import IAmA from "@/components/auth/Signup/IAmA";
import Interests from "@/components/auth/Signup/Interests";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { InterestsHandler } from "@/lib/InterestsHandler";
import {
  GenderSchema,
  InterestsSchema,
  OrientationSchema,
  ProfileDetailsImageAndBirthdateSchema,
  ProfileDetailsLargeSchema,
  ProfileDetailsSchema,
  SignupSchema,
} from "@/lib/SignupSchema";
import { toast } from "react-hot-toast";
import { SignupContext } from "@/context/SignupContext";
import Orientation from "@/components/auth/Signup/Orientation";

const Page = () => {
  const pathname = usePathname();
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { state } = useContext(SignupContext);

  const [errorMessage, setErrorMessage] = useState("");

  const constructPayload = () => {
    const img = { data: state.image, idx: 0 };
    const payload = {
      email: state.email,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      displayName: state.displayName,
      birthDate: state.birthDate,
      orientation: state.orientation,
      sex: state.gender,
      img: img,
      interests: InterestsHandler.interestsToInt(state.interests),
    };
    return payload;
  };
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [state]);

  const steps = isLargeScreen
    ? [
        "Sign Up",
        "Profile details",
        "Profile details",
        "I am a",
        "I want to date",
        "Your Interests",
      ]
    : ["Sign Up", "Profile details", "I am a", "I want to date", "Your Interests"];
  const schemas = isLargeScreen
    ? [
        SignupSchema,
        ProfileDetailsLargeSchema,
        ProfileDetailsImageAndBirthdateSchema,
        GenderSchema,
        OrientationSchema,
        InterestsSchema,
      ]
    : [SignupSchema, ProfileDetailsSchema, GenderSchema, OrientationSchema, InterestsSchema];

  const param = parseInt(pathname.split("/")[3]);
  const step = isNaN(param) || param < 1 || param > steps.length ? 1 : param;

  useEffect(() => {
    if (!isLargeScreen && step === 3 && steps[step - 1] === "Profile details") {
      router.push("/auth/signup/2");
    }
    //eslint-disable-next-line
  }, [isLargeScreen]);

  const checkAllFields = () => {
    schemas.forEach((schema) => {
      const res = schema.safeParse(state);
      if (res.error)
        res.error.errors.map((error) => {
          toast.error(error.message);
          setErrorMessage(" ");
        });
    });
  };

  const nextStep = () => {
    const result = schemas[step - 1].safeParse(state);
    if (result.error) {
      result.error.errors.map((error) => {
        setErrorMessage(error.message);
      });
      return;
    }
    if (step === steps.length) {
      checkAllFields();
      if (errorMessage.length > 0) return;
      setSubmitting(true);
      axios
        .post(
          process.env.NEXT_PUBLIC_API_URL + "/auth/register",
          constructPayload(),
          { withCredentials: true }
        )
        .then((res) => {
          setSubmitting(false);
          localStorage.setItem("user", JSON.stringify(res.data));
          toast.success("Account created successfully");
          router.push("/home");
        })
        .catch((err) => {
          //TODO: better error messaging
          setSubmitting(false);
          toast.error(
            "An error occurred" + err?.response?.data?.error || "ERROR",
            {
              duration: 5000,
            }
          );
        });
      setSubmitting(false);
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
          return <Orientation />;
        case 5:
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
          return <Orientation />;
        case 6:
          return <Interests />;
        default:
          return <Email />;
      }
    }
  };

  return (
    <div className="px-12 lg:py-6 py-0 flex flex-col relative sm:static justify-between lg:justify-around h-full gap-8">
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
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto max-h-[50vh] sm:overflow-y-hidden"
        >
          {renderFields()}
          <button className="hidden" type="submit"></button>
        </form>
      </div>
      <div className="flex flex-col gap-2 sm:static absolute bottom-4 left-0 px-12 sm:pb-0 pb-3 justify-around w-full">
        <div className="flex text-red-600 font-bold text-center justify-center">
          {errorMessage}
        </div>
        <div className="flex lg:flex-row flex-col gap-3">
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
            className={`font-bold ${
              submitting ? "opacity-50 cursor-wait" : ""
            }`}
            onClick={nextStep}
            disabled={submitting}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
