import Image from "@/node_modules/next/image";

export const AboutUs = () => {
  return (
    <div
      id="about-us"
      className="w-full h-fit px-8 lg:px-24 py-8 flex flex-col items-center justify-start gap-12"
    >
      <h1 className="font-bold font-montserrat tracking-[1.7px] text-[32px] lg:text-[45px] text-black">
        About Us
      </h1>
      <div className=" w-full lg:w-[700px] bg-white h-fit rounded-[13px] [box-shadow:-13px_35px_0px_0px_rgba(193,61,136,1)] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-14">
        <div className="w-1/2 h-full flex items-center justify-center">
          <Image src="/About.svg" alt="about-us" width={300} height={300} />
        </div>
        <div className="w-full lg:w-1/2 h-full  py-6 font-medium flex flex-col items-start justify-center  pl-4 gap-4">
          <p className="font-montserrat tracking-[1.9px] text-[18px] text-black leading-[36px] ">
            Welcome to <span className="font-bold text-primary">Matcha</span>,
            where meaningful connections are just a click away. Find friendship,
            romance, and everything in between in a safe, welcoming space. Join
            us today!
          </p>
          <button className="px-12 py-3 tracking-[1.7px]  text-lg font-bold font-montserrat rounded-full bg-primary text-white hover:bg-white hover:text-primary transition-all ease-in-out duration-300 hover:border hover:border-primary">
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
};
