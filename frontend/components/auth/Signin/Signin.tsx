"use client";
import Image from "next/image";
import { FormField, FormFieldInput } from "../FormField";
import { TermsAndPolicy } from "../TermsAndPolicy";
import { SignInOptions } from "./SigninOptions";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/shared/Button";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SigninFormFields: FormFieldInput[] = [
    {
      label: "Email",
      type: "email",
      required: true,
      onChange: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      label: "Password",
      type: "password",
      required: true,
      onChange: (e) => {
        setPassword(e.target.value);
      },
    },
  ];
  const router = useRouter();

  const handleSubmit = () => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        { email: email, password: password },
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Logged in successfully");
        router.push("/home");
      })
      .catch((err) => {
        toast.error("Failed to login" + err.response.data.error);
      });
  };
  return (
    <div
      className="
        flex
        flex-col
        lg:px-0
        lg:justify-center
        lg:items-center
        px-8
        h-screen
        w-screen
        lg:h-full
        lg:w-full
        lg:overflow-none"
    >
      <div className="lg:hidden gap-8 flex items-center justify-center">
        <Image src="/logo.png" width={172} height={70} alt="Logo" />
      </div>
      <div className="flex flex-col justify-around lg:w-full lg:justify-between lg:px-10">
        <h1 className="font-extrabold text-[34px]">Sign In</h1>
        <form
          className="flex flex-col lg:flex-row gap-4 py-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {SigninFormFields.map((field, index) => (
            <FormField key={index} {...field} />
          ))}
          <button type="submit" className="hidden"></button>
        </form>
      </div>
      <div
        className="
                flex
                flex-col
                lg:justify-around
                items-center
                h-full
                sm:w-fit
                gap-5
                lg:h-fit
                lg:px-10
                md:gap-0"
      >
        <Button type={true} className="font-bold" onClick={handleSubmit}>
          Sign In
        </Button>
        <SignInOptions />
      </div>
      <div className="flex flex-col items-center pb-3">
        <TermsAndPolicy />
      </div>
    </div>
  );
};
