import { IoCameraOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { PiWavesBold } from "react-icons/pi";
import { BiMicrophone } from "react-icons/bi";
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiMountains } from "react-icons/pi";
import { PiWineBold } from "react-icons/pi";
import { MdOutlineRamenDining } from "react-icons/md";
import { BiTennisBall } from "react-icons/bi";
import { TbParachute } from "react-icons/tb";
import { PiMusicNotesBold } from "react-icons/pi";
import { BiRun } from "react-icons/bi";
import { MdOutlineVideogameAsset } from "react-icons/md";
import { LiaSmokingSolid } from "react-icons/lia";
import { GiMeditation } from "react-icons/gi";
import { SignupContext } from "@/context/SignupContext";
import { useContext } from "react";

const Interests = () => {
  const { state, dispatch } = useContext(SignupContext);
  const interests = [
    { name: "Photography", icon: <IoCameraOutline /> },
    { name: "Shopping", icon: <AiOutlineShopping /> },
    { name: "Run", icon: <BiRun /> },
    { name: "Swimming", icon: <PiWavesBold /> },
    { name: "Karaoke", icon: <BiMicrophone /> },
    { name: "Yoga", icon: <GiMeditation /> },
    { name: "Art", icon: <IoColorPaletteOutline /> },
    { name: "Traveling", icon: <PiMountains /> },
    { name: "Cooking", icon: <MdOutlineRamenDining /> },
    { name: "Tennis", icon: <BiTennisBall /> },
    { name: "Extreme", icon: <TbParachute /> },
    { name: "Music", icon: <PiMusicNotesBold /> },
    { name: "Drink", icon: <PiWineBold /> },
    {
      name: "Video games",
      icon: <MdOutlineVideogameAsset />,
    },
    { name: "Smoking", icon: <LiaSmokingSolid /> },
  ];
  // eslint-disable-next-line
  const handleSelectInterest = (e: any) => {
    const value = e.target.value;
    if (state.interests.includes(value)) {
      dispatch({
        type: "SET_INTERESTS",
        payload: state.interests.filter((interest) => interest !== value),
      });
    } else {
      dispatch({ type: "SET_INTERESTS", payload: [...state.interests, value] });
    }
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
      {interests.map((interest, key) => {
        return (
          <div
            key={key}
            className={`flex border-2 border-black border-opacity-10 rounded-[15px] p-2 ${
              state.interests.includes(interest.name)
                ? "bg-primary text-white font-extrabold"
                : null
            }`}
          >
            <input
              type="checkbox"
              id={interest.name}
              name={interest.name}
              value={interest.name}
              className="hidden"
              onChange={handleSelectInterest}
            />
            <label
              htmlFor={interest.name}
              className="flex items-center gap-2 w-full h-full cursor-pointer whitespace-nowrap text-center"
            >
              <div
                className={`text-[20px] ${
                  state.interests.includes(interest.name)
                    ? "text-white"
                    : "text-primary"
                }`}
              >
                {interest.icon}
              </div>
              {interest.name}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Interests;
