import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const IAmA = () => {
  const genders = ["Woman", "Man", "Other"];
  const [selectedGender, setSelectedGender] = useState("");
  return (
    <div className="lg:px-[25%]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {genders.map((gender, index) => {
            return (
              <div key={index}>
                <label
                  className={`flex border-2 border-black border-opacity-10 rounded-[15px] p-4  hover:bg-pink-500
                  hover:text-white
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    gender === selectedGender
                      ? "bg-primary text-white font-bold"
                      : ""
                  } cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="sex"
                    value={gender}
                    onChange={(e) => {
                      setSelectedGender(e.target.value);
                    }}
                    className="hidden"
                  />
                  <span className="flex justify-between w-full">
                    {gender}
                    <FaCheck className="text-slate-200 text-[20px]" />
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IAmA;