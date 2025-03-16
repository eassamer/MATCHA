"use client";

import * as React from "react";

import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { HeaderTitle } from "./LandingPage/HeaderTitle";
import Link from "next/link";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const titles = [
    { title: "Home", link: "home" },
    { title: "Features", link: "features" },
    { title: "About Us", link: "about-us" },
    { title: "Contact Us", link: "contact-us" },
  ];
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className="w-[100px]"
        />
      </SidebarHeader>
      <SidebarContent>
        <VisuallyHidden.Root>Navigation</VisuallyHidden.Root>
        <div className="w-full h-full flex flex-col items-start pt-12 pl-6 justify-start gap-12">
          {titles.map((item, index) => (
            <Link href={`#${item.link}`} key={index}>
              <HeaderTitle key={index} title={item.title} />
            </Link>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        <Link
          href="/auth/signin"
          className=" flex items-center justify-center py-3 text-lg xl:px-8 xl:py-3 tracking-[1.7px]  xl:text-lg font-bold font-montserrat rounded-full hover:bg-primary hover:text-white bg-white text-primary transition-all ease-in-out duration-300 border-2 hover:border-transparent border-primary"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="mb-4 flex items-center justify-center py-3 text-lg xl:px-8 xl:py-3 tracking-[1.7px]  xl:text-lg font-bold font-montserrat rounded-full bg-primary text-white hover:bg-white hover:text-primary transition-all ease-in-out duration-300 hover:border hover:border-primary"
        >
          Sign Up
        </Link>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
