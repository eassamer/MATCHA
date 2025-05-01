// app/(main)/layout.tsx
"use client";
import {
  Home2,
  Heart,
  Message,
  Profile,
  Setting2,
  LoginCurve,
} from "iconsax-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavItem } from "@/components/home/NavItem";
import Image from "next/image";
import { NavItemD } from "@/components/home/NavItemD";
import { SectionNav } from "@/components/home/SectionNav";
import StoreProvider from "../StoreProvider";
import { NavigationProvider } from "@/context/NavigationContext";
import NotificationButton from "@/components/notification-button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Define navigation data with paths
  const routes = {
    mobileNav: [
      { path: "/home", Icon: Home2, showNotif: false },
      { path: "/likes", Icon: Heart, showNotif: true },
      { path: "/messages", Icon: Message, showNotif: false },
      { path: "/profile", Icon: Profile, showNotif: false },
      { path: "/settings", Icon: Setting2, showNotif: false },
    ],
    desktopMenu: [
      {
        path: "/home",
        Icon: Home2,
        title: "Discover",
        showNotif: false,
        variant: "Bold",
      },
      {
        path: "/likes",
        Icon: Heart,
        title: "Likes",
        showNotif: true,
        variant: "Linear",
      },
      {
        path: "/messages",
        Icon: Message,
        title: "Messages",
        showNotif: false,
        variant: "Bold",
      },
      {
        path: "/profile",
        Icon: Profile,
        title: "Profile",
        showNotif: false,
        variant: "Linear",
      },
    ],
    desktopGeneral: [
      {
        path: "/settings",
        Icon: Setting2,
        title: "Settings",
        showNotif: false,
        variant: "Linear",
      },
      {
        path: "/logout",
        Icon: LoginCurve,
        title: "Log out",
        showNotif: false,
        variant: "Linear",
      },
    ],
  };

  // Function to determine if an item is active based on path
  const isPathActive = (itemPath: string) => {
    return pathname.startsWith(itemPath);
  };
  return (
    <StoreProvider>
      <NavigationProvider>
        <div className="w-screen h-screen bg-black lg:flex items-center justify-center">
          <NotificationButton />
          <div className="w-[250px] h-full bg-[#F9F9F9] hidden lg:flex flex-col items-center justify-start gap-2">
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
              {routes.desktopMenu.map((item, index) => (
                <Link key={index} href={item.path} className="w-full">
                  <NavItemD
                    Icon={item.Icon}
                    active={isPathActive(item.path) ? index : -1}
                    setActive={() => {}}
                    index={index}
                    showNotif={item.showNotif}
                    variant={item.variant}
                    title={item.title}
                  />
                </Link>
              ))}
            </SectionNav>
            <SectionNav title="GENERAL">
              {routes.desktopGeneral.map((item, index) => (
                <Link key={index} href={item.path} className="w-full">
                  <NavItemD
                    Icon={item.Icon}
                    active={isPathActive(item.path) ? index : -1}
                    setActive={() => {}}
                    index={index}
                    showNotif={item.showNotif}
                    variant={item.variant}
                    title={item.title}
                  />
                </Link>
              ))}
            </SectionNav>
          </div>
          <div className="w-full h-[calc(100%-60px)] lg:w-[calc(100%-250px)] lg:h-full">
            {children}
          </div>
          <div className="w-full h-[60px] bg-[#F3F3F3] lg:hidden flex items-center justify-between px-7">
            {routes.mobileNav.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="h-full flex items-center"
              >
                <NavItem
                  Icon={item.Icon}
                  active={isPathActive(item.path) ? index : -1}
                  setActive={() => {}}
                  index={index}
                  showNotif={item.showNotif}
                />
              </Link>
            ))}
          </div>
        </div>
      </NavigationProvider>
    </StoreProvider>
  );
}
