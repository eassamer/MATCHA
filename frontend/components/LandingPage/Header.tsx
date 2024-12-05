import { HeaderTitle } from "@/components/LandingPage/HeaderTitle";
import Link from "@/node_modules/next/link";

export const Header = () => {
  const titles = ["Home", "Features", "About Us", "Contact Us"];

  return (
    <div className="w-full h-[70px] flex items-center justify-between  ">
      <div className="flex items-center justify-start  gap-12">
        {titles.map((title, index) => (
          <HeaderTitle key={index} title={title} />
        ))}
      </div>
      <div className="flex items-center justify-end gap-12">
        <Link href="#">
          <h1 className="tracking-[1.7px]  text-lg font-bold font-montserrat text-black ">
            Login
          </h1>
        </Link>

        <button className="px-8 py-3 tracking-[1.7px]  text-lg font-bold font-montserrat rounded-full bg-primary text-white">
          Sign Up
        </button>
      </div>
    </div>
  );
};
