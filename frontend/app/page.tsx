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
      image: "/Privacy.svg",
    },
  ];
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className=" w-[100vw] h-[100vh] bg-white  overflow-y-scroll">
          <div className="bg-white shadow w-full px-8 mb-2 lg:px-24 h-fit pt-8 pb-6 flex items-center lg:justify-center justify-between">
            <Image
              src="/logo.png"
              alt="logo"
              width={200}
              height={200}
              className="w-[100px] lg:w-[200px]"
            />
            <SidebarTrigger className=" size-[50px] p-0 lg:hidden -ml-1" />
          </div>
          <Header />
          <Main />
          <div
            id="features"
            className="w-full h-fit  py-8 flex flex-col items-center justify-start gap-12 px-24"
          >
            <h1 className="font-bold font-montserrat tracking-[1.7px] text-[32px] lg:text-[45px] text-black">
              Our Features
            </h1>
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
