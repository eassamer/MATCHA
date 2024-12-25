import { Card } from "@/components/Card";
import Link from "next/link";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";

export const SignUpOptions = () => {
  const icons = [FaFacebookSquare, FaGoogle, Si42];
  return (
      <div className="w-full h-fit flex items-center justify-center flex-col lg:pt-14">
          <div className="w-full flex flex-col items-center justify-center gap-10 h-fit">
              <div className="text-black font-montserrat font-bold text-[22px] lg:text-l">
                  Sign up to continue
              </div>
              <button className="btn-forward justify-center w-full font-montserrat text-[20px] font-extralight">Continue with email</button>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-fit gap-6">
              <div className="flex flex-row items-center justify-between gap-2 w-full ">
                  <div className="bg-slate-500 h-[1px] w-full"></div>
                  <div className=" text-slate-500 text-center w-full">
                      or sign up with
                  </div>
                  <div className="bg-slate-500 h-[1px] w-full"></div>
              </div>
              <div className="flex flex-row items-center justify-center gap-8 w-full">
                  {icons.map((item, index) => (
                      <Card key={index} href="#" Icon={item} />
                  ))}
              </div>
              <div>
                <Link href="/auth/signin" className="line-clamp-1 text-pink-500">Already have an account?</Link>
              </div>
      </div>
  </div>
  );
}