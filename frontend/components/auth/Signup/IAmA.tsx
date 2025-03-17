import { SignupContext } from "@/context/SignupContext";
import { useContext } from "react";
import { FaCheck } from "react-icons/fa6";

const IAmA = () => {
  const genders = [
    { sex: "female", gender: "Woman" },
    { sex: "male", gender: "Man" },
    { sex: "other", gender: "Other" },
  ];
  const { state, dispatch } = useContext(SignupContext);
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
                    gender.sex === state.gender
                      ? "bg-primary text-white font-bold"
                      : ""
                  } cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="sex"
                    id="sex"
                    required={true}
                    value={gender.sex}
                    onChange={(e) => {
                      dispatch({ type: "SET_GENDER", payload: e.target.value });
                    }}
                    className="hidden"
                  />
                  <span className="flex justify-between w-full">
                    {gender.gender}
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
