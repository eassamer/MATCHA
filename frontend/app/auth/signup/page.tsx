import { Card } from "@/components/Card";
import Image from "next/image";
import React from "react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";


function handleOauth(index: number) {
    switch (index) {
        case 0:
            return `${process.env.BACKEND_PUBLIC_URL}auth/facebook`;
        case 1:
            return `${process.env.BACKEND_PUBLIC_URL}auth/google`;
        case 2:
            return `${process.env.BACKEND_PUBLIC_URL}auth/42`;
        default:
            return "";
    }
}



function Signup() {
    const icons = [FaFacebookSquare, FaGoogle, Si42];


    return (
        <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full">
            <div className="flex items-center justify-center lg:hidden w-[178px] pb-[50px] top-0">
                <Image src="/logo.png" width={276} height={112} alt="Logo" />
            </div>
            <div className="items-center justify-center flex w-[300px] lg:w-[350px]">
                <Image src="/couple.svg" height={215} width={379} alt="" />
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="text-black font-montserrat font-bold text-xl lg:text-2xl mb-[60px]">
                    Signup to continue
                </div>
                <button className="btn-forward w-[300px] lg:w-full">Continue with email</button>
                <div className="flex flex-row items-center justify-around gap-2 w-full">
                    <div className="bg-slate-500 h-[1px] w-full"></div>
                    <div className=" text-slate-500 text-center w-[300px]">
                        or sign up with
                    </div>
                    <div className="bg-slate-500 h-[1px] w-full"></div>
                </div>
                <div className="flex flex-row items-center justify-center gap-8 w-[250px]">
                    {icons.map((item, index) => (
                        <Card key={index} href={handleOauth(index)} Icon={item} />
                    ))}
                </div>
            </div>
                <div className="flex flex-row items-center justify-between">
                    <a href="/policy/privacy" className="text-pink-500">
                        Terms of use
                    </a>
                    <div className="w-[50px]"></div>
                    <a href="/policy/termsofuse" className="text-pink-500">
                        Privacy Policy
                    </a>
                </div>
        </div>
    );
}

export default Signup;