import { DatePicker } from "@/components/shared/DatePicker";
import Image from "next/image";
import { HiCamera } from "react-icons/hi2";

const ProfileDetailsLarge = () => {
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="relative flex flex-col justify-center items-center w-[80px] h-[80px]">
          <Image
            src={"/avatar.jpg"}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-[25px]"
          />
          <button
            className="absolute bottom-0 right-0 bg-primary border-white border-2 rounded-full h-[30px] w-[30px] flex justify-center items-center"
            onClick={() => console.log("Change Avatar")}
          >
            <HiCamera className="text-[20px] text-white" />
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center py-10">
        <DatePicker />
      </div>
    </div>
  );
};

export default ProfileDetailsLarge;