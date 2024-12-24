import Image from "@/node_modules/next/image";

export const Main = () => {
  return (
    <div className="w-full lg:px-24 px-0 h-fit  flex lg:flex-row flex-col gap-8 lg:gap-0 items-center justify-center py-12">
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center text-center lg:text-start lg:items-start justify-center gap-2 lg:px-12 px-8 overflow-hidden">
        <h1 className="font-bold  font-montserrat tracking-[1.7px] text-[30px] lg:text-[42px] text-black">
          Start Matching
          <br />
          And Meet New People
        </h1>
        <p className=" font-montserrat tracking-[1.7px] text-[16px] lg:text-[20px] text-black">
          Lorem ipsum omor set nigga light
        </p>
        <button className="mt-4 px-16 py-4 tracking-[1.7px] text-md  lg:text-lg font-bold font-montserrat rounded-full bg-primary text-white hover:bg-white hover:text-primary transition-all ease-in-out duration-300 hover:border hover:border-primary">
          Start Matching
        </button>
      </div>
      <div className="hidden w-1/2 h-full  relative overflow-hidden lg:flex items-center justify-center">
        <Image
          src="/Vector.svg"
          alt="vector"
          className="w-[500px]"
          width={500}
          height={500}
          style={{ width: "500px", height: "auto" }}
        />
        <Image
          src="/Vector2.svg"
          alt="vector"
          className="absolute z-99 w-[500px]"
          width={500}
          height={500}
          style={{ width: "500px", height: "auto" }}
        />
      </div>
    </div>
  );
};
