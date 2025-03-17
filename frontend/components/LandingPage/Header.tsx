import { HeaderTitle } from "@/components/LandingPage/HeaderTitle";
import Link from "@/node_modules/next/link";

export const Header = () => {
  const titles = [
    { title: "Home", link: "home" },
    { title: "Features", link: "features" },
    { title: "About Us", link: "about-us" },
    { title: "Contact Us", link: "contact-us" },
  ];
  return (
    <div
      id="home"
      className=" w-full lg:px-24 px-8 h-fit lg:h-[70px] flex items-center justify-end lg:justify-between  "
    >
      <div className="hidden lg:flex items-center justify-start  gap-12">
        {titles.map((item, index) => (
          <Link href={`#${item.link}`} key={index}>
            <HeaderTitle key={index} title={item.title} />
          </Link>
        ))}
      </div>
      <div className="hidden lg:flex items-center justify-end gap-12">
        <Link href="/auth/login">
          <HeaderTitle title="Login" />
        </Link>

        <Link
          href="/auth/signup"
          className=" items-center justify-center hidden lg:flex lg:px-7 lg:py-3 lg:text-md xl:px-8 xl:py-3 tracking-[1.7px]  xl:text-lg font-bold font-montserrat rounded-full bg-primary text-white hover:bg-white hover:text-primary transition-all ease-in-out duration-300 hover:border hover:border-primary"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};
