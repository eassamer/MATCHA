"use client";
import { Card } from "@/components/auth/Card";
import { Button } from "@/components/shared/Button";
import Link from "next/link";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";

export const SignInOptions = () => {
  const icons = [FaFacebookSquare, FaGoogle, Si42];
  return (
    <div className="w-full lg:w-fit h-fit flex items-center justify-center flex-col lg:pt-[27px]">
      <div className="w-full flex flex-col items-center justify-center gap-8 h-fit">
        <Button type={true} className="font-bold">
          Sign In
        </Button>
      </div>
      <div className="flex flex-col items-center justify-around w-full gap-3 lg:py-0 py-4 static h-full">
        <div className="flex flex-row items-center justify-around gap-2 w-full">
          <div className="bg-[#000000] opacity-[40%] h-[0.5px] w-[35%]"></div>
          <h1 className=" text-black font-normal text-[12px] text-center pt-5">
            or sign in
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
      </div>
      <div>
        <Link
          href="/auth/signup"
          className="underline text-primary text-[12px]"
        >
          Don&apos;t have an account?
        </Link>
      </div>
    </div>
  );
};
