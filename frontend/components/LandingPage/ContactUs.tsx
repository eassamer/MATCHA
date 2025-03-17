import Image from "@/node_modules/next/image";
import { FaRegCopyright } from "react-icons/fa6";
import { ContactUsInfo } from "./ContactusInfo";
import { ContactusInput } from "./ContactUsInput";
import { SectionTitle } from "./SectionTitle";

export const ContactUs = () => {
  const ContactUsData = [
    {
      title: "Address",
      description: "40, hey bidawa, 33, mdina",
    },
    {
      title: "Email",
      description: "yasser,mehdi@l3alam.me",
    },
    {
      title: "Phone",
      description: "+212 691-470 860",
    },
  ];
  return (
    <div
      id="contact-us"
      className="w-full h-fit  pt-8 flex flex-col items-center justify-start"
    >
      <SectionTitle title="Contact us" />
      <div className="w-full h-fit py-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 bg-[#FBCFE8] rounded-t-[24px] px-12 lg:px-32">
        <div className="w-full md:w-1/3 h-full  flex flex-col items-center gap-6 justify-center">
          {ContactUsData.map((item, index) => (
            <ContactUsInfo
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        <div className="w-full md:w-1/3 h-full flex flex-col items-center justify-center gap-4">
          <div className="w-full h-fit flex items-center justify-between">
            <div className="w-[40%] h-full">
              <ContactusInput placeholder="First Name" type="text" />
            </div>
            <div className="w-[40%] h-full">
              <ContactusInput placeholder="Last Name" type="text" />
            </div>
          </div>
          <ContactusInput placeholder="Email" type="email" />
          <ContactusInput placeholder="Phone Number" type="text" />
          <div className="w-full h-[50px] flex items-center justify-end">
            <button className="px-12 py-3 tracking-[1.7px]  text-lg font-bold font-montserrat rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-all ease-in-out duration-300  hover:border-white hover:border-[2px]">
              Join Us
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[150px] bg-black flex items-center justify-between lg:justify-center relative px-8 lg:px-24">
        <div className="w-fit h-fit flex items-center lg:absolute lg:left-24 justify-center gap-4">
          <FaRegCopyright className="text-white" size={24} />
          <h1 className="font-bold font-montserrat tracking-[1.7px] text-[14px] text-white">
            Copyright 2023
          </h1>
        </div>
        <Image src="/white-logo.svg" alt="logo" width={140} height={200} />
        <div className="hidden lg:block w-[50px] h-[1px]"></div>
      </div>
    </div>
  );
};
