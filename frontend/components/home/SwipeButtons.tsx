import { Heart } from "iconsax-react";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";

export const SwipeButtons = ({
  setDirection,
  setShowDetailsCard,
}: {
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  setShowDetailsCard: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-fit h-fit  flex items-center justify-center gap-6 lg:gap-16">
      <button
        onClick={() => {
          setDirection("left");
          setShowDetailsCard(false);
        }}
        className="lg:size-[85px] size-[70px] [box-shadow:0px_20px_50px_0px_rgba(0,0,0,0.07)] text-xl font-bold font-montserrat bg-white rounded-full flex items-center justify-center"
      >
        <IoClose className="text-[26px] lg:text-[32px]" color="#F27121" />
      </button>
      <button
        onClick={() => {
          setDirection("up");
          setShowDetailsCard(false);
        }}
        className="lg:size-[99px] size-[85px] [box-shadow:0px_15px_15px_0px_rgba(233,64,87,0.2)] text-xl font-bold font-montserrat bg-primary rounded-full flex items-center justify-center"
      >
        <FaStar size={38} color="white" />
      </button>
      <button
        onClick={() => {
          setDirection("right");
          setShowDetailsCard(false);
        }}
        className="lg:size-[85px] size-[70px] [box-shadow:0px_20px_50px_0px_rgba(0,0,0,0.07)] text-xl font-bold font-montserrat bg-white rounded-full flex items-center justify-center"
      >
        <Heart
          variant="Bold"
          className="text-[26px] lg:text-[32px]"
          color="#8A2387"
        />
      </button>
    </div>
  );
};
