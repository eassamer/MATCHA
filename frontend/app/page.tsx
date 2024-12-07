import { AboutUs } from "@/components/LandingPage/AboutUs";
import { ContactUs } from "@/components/LandingPage/ContactUs";
import { FeatureCard } from "@/components/LandingPage/FeatureCard";
import { Header } from "@/components/LandingPage/Header";
import { Main } from "@/components/LandingPage/Main";
import Image from "@/node_modules/next/image";
import { title } from "process";

export default function Home() {
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
    <div className=" w-[100vw] h-[100vh] bg-white  overflow-y-scroll">
      <div className="w-full px-24 h-fit pt-8 pb-6 flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </div>
      <Header />
      <Main />
      <div className="w-full h-[500px]  py-8 flex flex-col items-center justify-start gap-12 px-24">
        <h1 className="font-bold font-montserrat tracking-[1.7px] text-[45px] text-black">
          Our Features
        </h1>
        <div className="w-full h-full flex items-center  justify-center gap-12">
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
  );
}
