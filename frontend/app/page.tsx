import { Header } from "@/components/LandingPage/Header";
import { Main } from "@/components/LandingPage/Main";
import Image from "@/node_modules/next/image";

export default function Home() {
  return (
    <div className=" w-[100vw] h-[100vh] bg-white px-24 overflow-y-scroll">
      <div className="w-full h-fit pt-8 pb-6 flex items-center justify-center">
        <Image src="/logo.png" alt="logo" width={200} height={200} />
      </div>
      <Header />
      <Main />
      <div className="w-full h-[500px] bg-blue-300 py-8 flex flex-col items-center justify-start gap-12">
        <h1 className="font-bold font-montserrat tracking-[1.7px] text-[45px] text-black">
          Our Features
        </h1>
      </div>
    </div>
  );
}
