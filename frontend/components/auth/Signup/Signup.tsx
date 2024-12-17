import { Card } from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";

const Media = () => {
    return (
        <div>
            <div className="flex items-center justify-center lg:hidden w-full pb-[50px] ">
                <Image src="/logo.png" width={276} height={112} alt="Logo" />
            </div>
            <div className="items-center justify-center flex w-[300px] lg:w-fit">
                <Image src="/couple.svg" height={215} width={379} alt="" />
            </div>
        </div>
    );
}

const SignUpOptions = () => {
    const icons = [FaFacebookSquare, FaGoogle, Si42];
    return (
        <div>
            <div className="w-full flex flex-col items-center justify-around h-full">
                <div className="text-black font-montserrat font-bold text-[22px] lg:text-l">
                    Sign up to continue
                </div>
                <button className="btn-forward justify-center w-full font-montserrat text-[20px] font-light">Continue with email</button>
            </div>
            <div className="items-center justify-center w-full h-full">
                <div className="flex flex-row items-center justify-between gap-2 w-full ">
                    <div className="bg-slate-500 h-[1px] w-full"></div>
                    <div className=" text-slate-500 text-center w-full">
                        or sign up with
                    </div>
                    <div className="bg-slate-500 h-[1px] w-full"></div>
                </div>
                <div className="flex flex-row items-center justify-center gap-8 w-full">
                    {icons.map((item, index) => (
                        <Card key={index} href="#" Icon={item} />
                    ))}
                </div>
        </div>
    </div>
    );
}

const TermsAndPolicy = () => {
    return (
        <div className="h-auto w-fit flex">
            <Link href="/policy/privacy" className="text-pink-500">
                Terms of use
            </Link>
            <div className="w-[50px]"></div>
            <Link href="/policy/termsofuse" className="text-pink-500">
                Privacy Policy
            </Link>
        </div>
    );
}

export const SignUp = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-around h-full w-full overflow-hidden">
            <Media />
            <SignUpOptions />
            <TermsAndPolicy />
        </div>
    );
}