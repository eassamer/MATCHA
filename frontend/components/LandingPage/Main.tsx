import Image from "@/node_modules/next/image";

export const Main = () => {
  return (
    <div className="w-full h-fit  flex items-center justify-center py-12">
      <div className="w-1/2 h-full flex flex-col items-start justify-center gap-2 px-12 overflow-hidden">
        <h1 className="font-bold  font-montserrat tracking-[1.7px] text-[45px] text-black">
          Start Matching
          <br />
          And Meet New People
        </h1>
        <p className=" font-montserrat tracking-[1.7px] text-[20px] text-black">
          Lorem ipsum omor set nigga light
        </p>
        <button className="mt-4 px-16 py-4 tracking-[1.7px]  text-lg font-bold font-montserrat rounded-full bg-primary text-white">
          Start Matching
        </button>
      </div>
      <div className="w-1/2 h-full  relative overflow-hidden flex items-center justify-center">
        <Image
          src="/Vector.svg"
          alt="vector"
          className="w-[500px]"
          width={500}
          height={500}
        />
        <Image
          src="/Vector2.svg"
          alt="vector"
          className="absolute z-99 w-[500px]"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};
