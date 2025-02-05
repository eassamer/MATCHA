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
        lg:justify-center
        flex-col
        px-8
        h-full
        w-full
        lg:overflow-auto
        "
    >
      <div className="lg:hidden py-10 flex items-center justify-center">
        <Image src="/logo.png" width={172} height={70} alt="Logo" />
      </div>
      <div className="flex flex-col gap-8 lg:gap-4 justify-around lg:justify-none">
        <h1 className="font-extrabold text-[34px]">Sign In</h1>
        <Form formFields={SigninFormFields} />
      </div>
      <div
        className="
                flex
                flex-col
                justify-around
                lg:items-center
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
