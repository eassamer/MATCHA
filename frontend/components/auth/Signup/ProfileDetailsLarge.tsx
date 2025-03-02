import { DatePicker } from "@/components/shared/DatePicker";
import { SignupContext } from "@/context/SignupContext";
import Image from "next/image";
import { useContext, useRef } from "react";
import { HiCamera } from "react-icons/hi2";

const ProfileDetailsLarge = () => {
  const { state, dispatch } = useContext(SignupContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be 2MB or less.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      dispatch({ type: "SET_IMAGE", payload: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleDateChange = (date: Date) => {
    dispatch({ type: "SET_BIRTHDATE", payload: date });
  };
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="relative flex flex-col justify-center bg-cover items-center w-[80px] h-[80px]">
          <Image
            src={state.image || "/avatar.jpg"}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-[25px]"
          />
          <button
            className="absolute bottom-0 right-0 bg-primary border-white border-2 rounded-full h-[30px] w-[30px] flex justify-center items-center"
            onClick={handleButtonClick}
            type="button"
          >
            <HiCamera className="text-[20px] text-white" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center py-10">
        <DatePicker date={state.birthdate} setDate={handleDateChange} />
      </div>
    </div>
  );
};

export default ProfileDetailsLarge;
