"use client";
import Image from "next/image";
import { FormFieldInput } from "../FormField";
import { Form } from "../Form";
import { Card } from "../Card";
import { Link } from "lucide-react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { Si42 } from "react-icons/si";

const SigninFormFields: FormFieldInput[] = [
  { label: "Email", type: "email", required: true },
  { label: "Password", type: "password", required: true },
];

export const SignIn = () => {
  const icons = [FaFacebookSquare, FaGoogle, Si42];
  return (
    <div>
      <div className="lg:hidden py-5 flex items-center justify-center">
        <Image src="/logo.png" width={172} height={70} alt="Logo" />
      </div>
      <div className="px-12">
        <h1 className="font-bold text-[34px]">Sign In</h1>
        <Form formFields={SigninFormFields} />
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="bg-[#000000] opacity-[40%] h-[0.5px] w-[35%]"></div>
          <h1 className=" text-black font-normal text-[12px] text-center pt-5">
            or sign up
            <br />
            with
          </h1>
          <div className="bg-[#000000] opacity-[40%] h-[0.5px] w-[35%]"></div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5 w-full">
          {icons.map((item, index) => (
            <Card key={index} href="#" Icon={item} />
          ))}
        </div>
        <div>
          <Link
            href="/auth/signup"
            className="underline text-primary text-[12px]"
          >
            Don&apos;t have an account?
            <div>Create One</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
