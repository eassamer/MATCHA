"use client";
import { TbArrowsSort } from "react-icons/tb";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";
import { getLikes } from "@/hooks/likes";
import { profileInfoType } from "@/lib/features/likes/likesSlice";
import { useAppSelector } from "@/lib/hooks";
import { calculateAge } from "../Card";
import { BounceLoader } from "react-spinners";

export default function LikesSection() {
  const [loader, setLoader] = useState(true);
  const profiles = useAppSelector((state) => state.likes.profiles);

  useEffect(() => {
    if (profiles.length == 1 && profiles[0].id == "") {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [profiles]);
  if (loader) {
    return (
      <div className="bg-white w-full h-full  lg:h-[90%] rounded-none lg:rounded-3xl p-6 md:p-10 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl text-poppins font-bold text-gray-900">
              See who likes you
            </h1>
            <p className="text-gray-600 font-poppings mt-2">
              This is a list of people who have liked you and your matches.
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-2xl">
            <TbArrowsSort className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="w-full  flex  h-[90%] items-center justify-center">
          <BounceLoader color="#C13D88" />
        </div>
      </div>
    );
  }
  return (
    <section className="bg-white w-full h-full lg:h-[90%] overflow-y-scroll rounded-none lg:rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl text-poppins font-bold text-gray-900">
            See who likes you
          </h1>
          <p className="text-gray-600 font-poppings mt-2">
            This is a list of people who have liked you and your matches.
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-2xl">
          <TbArrowsSort className="w-6 h-6 text-primary" />
        </div>
      </div>
      {profiles.length == 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl md:text-4xl text-poppins font-bold text-gray-900">
            No likes yet
          </h1>
          <p className="text-gray-600 font-poppings mt-2">
            You have no likes yet. Keep swiping to find matches!
          </p>
        </div>
      )}
      {profiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 custom:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
          {profiles.map((profile) => (
            <ProfileCard
              key={`${profile.displayName}`}
              userId={profile.userId}
              name={profile.displayName}
              age={calculateAge(profile.birthDate!)}
              image={profile.userImages[0]}
              isSuperLiker={profile.radiusInKm < 10}
            />
          ))}
        </div>
      )}
    </section>
  );
}
