"use server";
import { AboutUs } from "@/components/LandingPage/AboutUs";
import { ContactUs } from "@/components/LandingPage/ContactUs";
import { Header } from "@/components/LandingPage/Header";
import { Main } from "@/components/LandingPage/Main";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "@/node_modules/next/image";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Features } from "@/components/LandingPage/Features";

export default async function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className=" w-[100vw] h-[100vh] bg-white  overflow-y-scroll">
          <div className="bg-white shadow lg:shadow-none w-full px-8 mb-2 lg:px-24 h-fit pt-8 pb-6 flex items-center justify-center relative">
            <SidebarTrigger className="absolute left-12 size-[50px] p-0 lg:hidden -ml-1" />
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
              className="w-[140px] lg:w-[200px]"
            />
          </div>
          <Header />
          <Main />
          <Features />
          <AboutUs />
          <ContactUs />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
