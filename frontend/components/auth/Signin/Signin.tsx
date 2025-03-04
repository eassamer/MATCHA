"use client";
import Image from "next/image";
import { FormFieldInput } from "../FormField";
import { Form } from "../Form";
import { TermsAndPolicy } from "../TermsAndPolicy";
import { SignInOptions } from "./SigninOptions";

export const SignIn = () => {
  const SigninFormFields: FormFieldInput[] = [
    { label: "Email", type: "email", required: true },
    { label: "Password", type: "password", required: true },
  ];
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
      <div className="lg:hidden py-6 flex items-center justify-center">
        <Image src="/logo.png" width={172} height={70} alt="Logo" />
      </div>
      <div className="flex flex-col gap-8 justify-around lg:w-full lg:justify-between lg:px-10">
        <h1 className="font-extrabold text-[20px] lg:text-[34px]">Sign In</h1>
        <Form  className="gap-4" formFields={SigninFormFields} />
      </div>
      <div
        className="
                flex
                flex-col
                justify-around
                items-center
                lg:justify-center
                h-full
                w-full
                gap-5
                lg:h-fit
                lg:px-10
                "
      >
        <SignInOptions />
        <TermsAndPolicy />
      </div>
    </div>
  );
};
