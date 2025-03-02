"use client";
import { Home2, Heart, Message, Profile, Setting2, LoginCurve } from "iconsax-react";
import { useState } from "react";
import { NavItem } from "@/components/home/NavItem";
import Image from "next/image";
import { title } from "process";
import { NavItemD } from "@/components/home/NavItemD";
import { Section } from "lucide-react";
import { SectionNav } from "@/components/home/SectionNav";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const NavItems = [
    {
      Icon: Home2,
      showNotif: false,
    },
    {
      Icon: Heart,
      showNotif: true,
    },
    {
      Icon: Message,
      showNotif: false,
    },
    {
      Icon: Profile,
      showNotif: false,
    },
  ];

  const DesktopNavItems = [
    {
      Icon: Home2,
      title: "Discover",
      showNotif: false,
      variant: "Bold",
    },
    {
      Icon: Heart,
      title: "Likes",
      showNotif: true,
      variant: "Linear",
    },
    {
      Icon: Message,
      title: "Messages",
      showNotif: false,
      variant: "Bold",
    },
    {
      Icon: Profile,
      title: "Profile",
      showNotif: false,
      variant: "Linear",
    },
  ];

  const SecondNaVItems = [
    {
      Icon: Setting2,
      title: "Settings",
      showNotif: false,
      variant: "Linear",
    },
    {
      Icon: LoginCurve,
      title: "Log out",
      showNotif: false,
      variant: "Linear",
    },
  ];
  return (
    <div className="w-screen h-screen bg-black lg:flex items-center justify-center">
      <div className="w-[250px] h-full bg-[#F3F3F3] hidden lg:flex flex-col items-center justify-start gap-2">
        <div className="w-full py-8 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={140}
            height={140}
            style={{ width: "140px" }}
          />
        </div>
        <SectionNav title="MENU">
          {DesktopNavItems.map((item, index) => (
            <NavItemD
              key={index}
              Icon={item.Icon}
              active={active}
              setActive={setActive}
              index={index}
              showNotif={item.showNotif}
              variant={item.variant}
              title={item.title}
            />
          ))}
        </SectionNav>
        <SectionNav title="GENERAL">
          {SecondNaVItems.map((item, index) => (
            <NavItemD
              key={index}
              Icon={item.Icon}
              active={active}
              setActive={setActive}
              index={index + 4}
              showNotif={item.showNotif}
              variant={item.variant}
              title={item.title}
            />
          ))}
        </SectionNav>
      </div>
      <div className="w-full h-[calc(100%-60px)] lg:w-[calc(100%-250px)] lg:h-full">
        {children}
      </div>
      <div className="w-full h-[60px] bg-[#F3F3F3] lg:hidden flex items-center justify-between px-12">
        {NavItems.map((item, index) => (
          <NavItem
            key={index}
            Icon={item.Icon}
            active={active}
            setActive={setActive}
            index={index}
            showNotif={item.showNotif}
          />
        ))}
      </div>
    </div>
  );
}
