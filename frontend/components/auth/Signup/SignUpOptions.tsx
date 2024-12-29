import { Card } from "@/components/auth/Card";
import { Button } from "@/components/shared/Button";
import Link from "next/link";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { Si42 } from "react-icons/si";

export const SignUpOptions = () => {
  const icons = [FaFacebookSquare, FaGoogle, Si42];
  return (
      <div className="w-full h-fit flex items-center justify-center flex-col lg:pt-[27px]">
          <div className="w-full flex flex-col items-center justify-center gap-10 h-fit">
              <div className="text-black font-montserrat font-bold text-[18px] lg:text-l">
                  Sign up to continue
              </div>
              <Button type={true} className="font-bold">
                Continue With Email
              </Button>

          </div>
          <div className="flex flex-col items-center justify-center w-full h-fit gap-3">
              <div className="flex flex-row items-center justify-between gap-2 w-full">
                  <div className="bg-[#000000] opacity-[40%] h-[0.5px] w-[35%]"></div>
                  <h1 className=" text-black font-normal text-[12px] text-center pt-5">
                      or sign up with
                  </h1>
                  <div className="bg-[#000000] opacity-[40%] h-[0.5px] w-[35%]"></div>
              </div>
              <div className="flex flex-row items-center justify-center gap-5 w-full">
                  {icons.map((item, index) => (
                      <Card key={index} href="#" Icon={item} />
                  ))}
              </div>
              <div>
                <Link href="/auth/signin" className="underline text-primary text-[12px]">Already have an account?</Link>
              </div>
      </div>
  </div>
  );
}