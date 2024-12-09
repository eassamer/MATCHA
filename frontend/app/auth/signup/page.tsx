'use server'
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
    const icons = [
        { icon: FaFacebookSquare, color: "#C13D88" },
        { icon: FaGoogle, color: "#C13D88" },
        { icon: Si42, color: "#C13D88" },
    ];


    return (
        <div className="flex flex-row h-full w-full">
            <div className="items-center justify-center flex flex-col w-[350px]">
                <Image src="/couple.svg" height={215} width={379} alt="" />
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="text-black font-montserrat font-bold text-2xl mb-[60px]">
                    Signup to continue
                </div>
                <button className="btn-forward w-full">Continue with email</button>
                <div className="flex flex-row items-center justify-cente w-full mt-[30px]">
                    <div className="bg-slate-500 h-[1px] mx-[30px] w-[100px]"></div>
                    <div className=" text-slate-500 text-center">
                        or sign up with
                    </div>
                    <div className="bg-slate-500 h-[1px] mx-[30px] w-[100px]"></div>
                </div>
                <div className="flex flex-row items-center justify-between w-[250px]">
                    {icons.map((item, index) => (
                        <a
                            key={index}
                            className="flex flex-row items-center justify-center rounded-[15px] h-[60px] w-[60px] border-spacing-5 border-slate-300 border-[1px]"
                            href={handleOauth(index)}
                        >
                            {React.createElement(item.icon, {
                                size: 30,
                                color: item.color,
                                className: "cursor-pointer",
                            })}
                        </a>
                    ))}
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
        </div>
    );
}

export default Signup;