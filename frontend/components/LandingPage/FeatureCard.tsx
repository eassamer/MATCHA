import Image from "next/image";

export const FeatureCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div
      className="w-[289px] h-[271px] rounded-[13px] bg-white 
          [box-shadow:0px_4px_10.8px_2px_rgba(0,0,0,0.2)] px-6 flex items-center justify-center"
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <Image
          width={140}
          height={140}
          src={image}
          alt="feature"
          style={{ width: "140px", height: "auto" }}
        />
        <h1 className="font-bold font-montserrat tracking-[1.7px] text-[20px] text-black">
          {title}
        </h1>
        <p className="font-montserrat tracking-[1.7px] text-[16px] text-black text-center">
          {description}
        </p>
      </div>
    </div>
  );
};
