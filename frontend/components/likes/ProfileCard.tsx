import { addDislike, addLike } from "@/hooks/likes";
import { Heart } from "iconsax-react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface ProfileCardProps {
  userId: string;
  name: string;
  age: number;
  image: string;
  isSuperLiker: boolean;
}

export default function ProfileCard({
  userId,
  name,
  age,
  image,
  isSuperLiker,
}: ProfileCardProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden  ${
        isSuperLiker && "ring-[3.1px] ring-primary"
      }`}
    >
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${name}'s profile`}
          width={300}
          height={400}
          className="w-full aspect-[3/4] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white font-medium font-poppins">
            {name}, {age}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 bg-gray-800">
        <button
          onClick={async () => {
            addDislike(userId);
          }}
          className="p-3 flex justify-center items-center hover:bg-gray-700 transition"
        >
          <IoClose size={24} className=" text-white" />
        </button>
        <button
          onClick={async () => {
            addLike(userId);
          }}
          className="p-3 flex justify-center items-center hover:bg-gray-700 transition"
        >
          <Heart variant="Bold" size={24} className="  text-white" />
        </button>
      </div>
    </div>
  );
}
