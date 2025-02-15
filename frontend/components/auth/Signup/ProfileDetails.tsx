import { DatePicker } from "@/components/shared/DatePicker";
import { Form } from "../Form";
import Image from "next/image";
import { HiCamera } from "react-icons/hi2";

const ProfileDetails = () => {
  const formFields = [
    { label: "First Name", type: "text", required: true },
    { label: "Last Name", type: "text", required: true },
  ];
  const displayNameField = [
    { label: "Display Name", type: "text", required: true },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:justify-normal gap-4 w-full">
        <div className="relative flex flex-col justify-center items-center w-[80px] h-[80px] lg:hidden">
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
      <div className="flex flex-col lg:gap-8">
        <Form
          formFields={formFields}
          className="gap-4 pt-4 lg:pt-0 lg:flex-row"
        />
        <Form
          formFields={displayNameField}
          className="gap-4 pt-4 lg:pt-0 justify-center"
        />
        <div className="w-full flex justify-center items-center py-10 lg:hidden">
          <DatePicker />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;