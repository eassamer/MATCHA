"use client";
import { RiHome5Fill } from "react-icons/ri";
import { GoHeartFill } from "react-icons/go";
import { HiChatAlt2 } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import { NavItem } from "@/components/home/NavItem";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const NavItems = [
    {
      Icon: RiHome5Fill,
      showNotif: false,
    },
    {
      Icon: GoHeartFill,
      showNotif: true,
    },
    {
      Icon: HiChatAlt2,
      showNotif: false,
    },
    {
      Icon: FaUserAlt,
      showNotif: false,
    },
  ];
  return (
    <div className="w-screen h-screen bg-black">
      <div className="w-full h-[calc(100%-60px)]">{children}</div>
      <div className="w-full h-[60px] bg-[#F3F3F3] flex items-center justify-between px-12">
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
