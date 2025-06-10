import { SignupContext } from "@/context/SignupContext";
import { useContext } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosMale } from "react-icons/io";
import { IoIosFemale } from "react-icons/io";
import { PiGenderNonbinary } from "react-icons/pi";

const Orientation = () => {
  const { state, dispatch } = useContext(SignupContext);
  const orientations = [
    {
      orientation: "female",
      sexuality: "Female",
      icon: (
        <IoIosFemale
          className={`${
            state.orientation.includes("female") && "text-white"
          } text-primary text-[20px] group-hover:text-white`}
        />
      ),
    },
    {
      orientation: "male",
      sexuality: "Male",
      icon: (
        <IoIosMale
          className={`${
            state.orientation.includes("male") && "text-white"
          } text-primary text-[20px] group-hover:text-white`}
        />
      ),
    },
    {
      orientation: "other",
      sexuality: "Other",
      icon: (
        <PiGenderNonbinary
          className={` ${
            state.orientation.includes("other") && "text-white"
          } text-primary text-[20px] group-hover:text-white`}
        />
      ),
    },
  ];
  // eslint-disable-next-line
  const handleSelectOrientation = (e: any) => {
    const value = e.target.value;
    if (state.orientation.includes(value)) {
      dispatch({
        type: "SET_ORIENTATION",
        payload: state.orientation.filter(
          (orientation) => orientation !== value
        ),
      });
    } else {
      dispatch({
        type: "SET_ORIENTATION",
        payload: [...state.orientation, value],
      });
    }
  };
  return (
    <div className="lg:px-[25%]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {orientations.map((orientation, index) => {
            return (
              <div key={index}>
                <label
                  className={`flex border-2 border-black border-opacity-10 rounded-[15px] p-4  hover:bg-pink-500 group
                  hover:text-white
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    state.orientation.includes(orientation.orientation)
                      ? "bg-primary text-white font-bold"
                      : ""
                  } cursor-pointer`}
                >
                  <input
                    type="checkbox"
                    name={orientation.orientation}
                    id={orientation.orientation}
                    value={orientation.orientation}
                    onChange={handleSelectOrientation}
                    className="hidden"
                  />
                  <span className="flex justify-between w-full">
                    {orientation.sexuality}
                    {orientation.icon}
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

export default Orientation;
