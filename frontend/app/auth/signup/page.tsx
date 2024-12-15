import { Card } from "@/components/Card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";



function Signup() {
    const icons = [FaFacebookSquare, FaGoogle, Si42];


    return (
        <div className="flex flex-col lg:flex-row items-center justify-around h-full w-full overflow-hidden">
            <div className="flex items-center justify-center lg:hidden w-[178px] pb-[50px] top-0">
                <Image src="/logo.png" width={276} height={112} alt="Logo" />
            </div>
            <div className="items-center justify-center flex w-[300px] lg:w-fit">
                <Image src="/couple.svg" height={215} width={379} alt="" />
            </div>
            <div className="h-fit gap-8 rounded-[15px] items-center justify-between py-11 px-10 bg-blue-300 flex flex-col">
                <div className="flex flex-col items-center justify-around w-full h-full">
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
                        <div className="h-auto w-full flex">
                            <Link href="/policy/privacy" className="text-pink-500">
                                Terms of use
                            </Link>
                            <div className="w-[50px]"></div>
                            <Link href="/policy/termsofuse" className="text-pink-500">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Signup;