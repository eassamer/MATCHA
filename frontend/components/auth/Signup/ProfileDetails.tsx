import { DatePicker } from "@/components/shared/DatePicker";
import Image from "next/image";
import { HiCamera } from "react-icons/hi2";
import { FormField } from "../FormField";
import { useContext, useRef } from "react";
import { SignupContext } from "@/context/SignupContext";

const ProfileDetails = () => {
  const { state, dispatch } = useContext(SignupContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handleDateChange = (date: Date) => {
    dispatch({ type: "SET_BIRTHDATE", payload: date });
  };
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

  const formFields = [
    {
      label: "First Name",
      type: "text",
      required: true,
      value: state.firstName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_FIRST_NAME", payload: e.target.value });
      },
    },
    {
      label: "Last Name",
      type: "text",
      required: true,
      value: state.lastName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_LAST_NAME", payload: e.target.value });
      },
    },
  ];
  const displayNameField = {
    label: "Display Name",
    type: "text",
    required: true,
    value: state.displayName,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_DISPLAY_NAME", payload: e.target.value });
    },
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:justify-normal gap-4 w-full">
        <div className="relative flex flex-col justify-center items-center bg-cover w-[60px] h-[60px] lg:hidden">
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
      <div className="flex flex-col lg:gap-8 gap-4">
        <div className={`flex flex-col lg:flex-row gap-4`}>
          {formFields.map((formField, index) => (
            <FormField key={index} {...formField} />
          ))}
        </div>
        <div className="flex justify-center">
          <FormField {...displayNameField} />
        </div>
        <div className="w-full flex justify-center items-center sm:py-10 py-0 lg:hidden">
          <DatePicker date={state.birthDate} setDate={handleDateChange} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
