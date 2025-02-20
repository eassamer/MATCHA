import { DatePicker } from "@/components/shared/DatePicker";
import Image from "next/image";
import { HiCamera } from "react-icons/hi2";
import { FormField } from "../FormField";
import { useContext } from "react";
import { SignupContext } from "@/context/SignupContext";

const ProfileDetails = () => {
  const { state, dispatch } = useContext(SignupContext);
  const handleDateChange = (date: Date) => {
    dispatch({ type: "SET_BIRTHDATE", payload: date });
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
        <div className="relative flex flex-col justify-center items-center w-[60px] h-[60px] lg:hidden">
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
          <DatePicker date={state.birthdate} setDate={handleDateChange}/>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
