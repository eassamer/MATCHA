import { Card } from "@/components/Card";
import Image from "next/image";
import React from "react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";

const Media = () => {
    return (
        <div className="w-fit h-fit flex flex-col items-center gap-12 bg-green-500">
            <div className="lg:hidden  bg-red-400">
                <Image src="/logo.png" width={276} height={112} alt="Logo" />
            </div>
            <div className="items-center justify-center flex md:w-[300px] w-[250px] lg:w-fit">
                <Image src="/couple.svg" className="md:w-[300px] w-[250px]" height={215} width={300} alt="" />
            </div>
        </div>
    );
}

const SignUpOptions = () => {
    const icons = [FaFacebookSquare, FaGoogle, Si42];
    return (
        <div className="w-full h-fit flex items-center justify-center gap-12 flex-col">
            <div className="w-full flex flex-col items-center justify-center gap-10 h-fit">
                <div className="text-black font-montserrat font-bold text-[22px] lg:text-l">
                    Sign up to continue
                </div>
                <button className="btn-forward justify-center w-full font-montserrat text-[20px] font-light">Continue with email</button>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-fit gap-6">
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



export const SignUp = () => {
    return (
        <div className="flex px-12   flex-col lg:flex-row items-center justify-start pt-24 gap-12 h-full w-full">
            <Media />
            <SignUpOptions />
        </div>
    );
}