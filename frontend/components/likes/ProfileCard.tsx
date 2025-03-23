import { X, Heart } from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  age: number;
  image: string;
  isMatch?: boolean;
}

export default function ProfileCard({
  name,
  age,
  image,
  isMatch = false,
}: ProfileCardProps) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${
        isMatch ? "ring-2 ring-blue-400" : ""
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
        <button className="p-3 flex justify-center items-center hover:bg-gray-700 transition">
          <X className="w-5 h-5 text-white" />
        </button>
        <button className="p-3 flex justify-center items-center hover:bg-gray-700 transition">
          <Heart className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
