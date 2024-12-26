"use server";
import { AboutUs } from "@/components/LandingPage/AboutUs";
import { ContactUs } from "@/components/LandingPage/ContactUs";
import { FeatureCard } from "@/components/LandingPage/FeatureCard";
import { Header } from "@/components/LandingPage/Header";
import { Main } from "@/components/LandingPage/Main";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Image from "@/node_modules/next/image";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SectionTitle } from "@/components/LandingPage/SectionTitle";

export default async function Home() {
  const Features = [
    {
      title: "Meet",
      desciprition: "Meet new people and match with them to know them more",
      image: "/Meet.svg",
    },
    {
      title: "Discover",
      desciprition: "Meet new people and match with them to know them more",
      image: "/Discover.svg",
    },
    {
      title: "Privacy",
      desciprition:
        "Im Just typing shit here to make it good nadafak ou solo rabat 3la mok",
      image: "/privacy.svg",
    },
  ];
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className=" w-[100vw] h-[100vh] bg-white  overflow-y-scroll">
          <div className="bg-white shadow lg:shadow-none w-full px-8 mb-2 lg:px-24 h-fit pt-8 pb-6 flex items-center lg:justify-center justify-between">
            <SidebarTrigger className=" size-[50px] p-0 lg:hidden -ml-1" />
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
              className="w-[140px] lg:w-[200px]"
            />
            <div className="w-[60px] h-1"></div>
          </div>
          <Header />
          <Main />
          <div
            id="features"
            className="w-full h-fit  py-8 flex flex-col items-center justify-start gap-12 px-8 lg:px-24"
          >
            <SectionTitle title="Our features" />
            <div className="w-full h-full flex-col lg:flex-row flex items-center  justify-center gap-12">
              {Features.map((item, index) => (
                <FeatureCard
                  key={index}
                  title={item.title}
                  description={item.desciprition}
                  image={item.image}
                />
              ))}
            </div>
          </div>
          <AboutUs />
          <ContactUs />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
