"use client";

import type React from "react";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileAbout from "@/components/profile/profile-about";
import ProfileEditGallery from "./profile-edit-gallery";
import EditProfileDialog from "./edit-profile-dialog";
import { useEffect, useState } from "react";
import MyInterests from "./my-interests";
import { useAppSelector } from "@/lib/hooks";
import { initialState } from "@/lib/features/user/userSlice";
import { InterestsHandler } from "@/lib/InterestsHandler";
import { BounceLoader } from "react-spinners";

export interface profileInfoType {
  name: string;
  age: number;
  bio: string;
  profession: string;
  rating: number;
  interests: string[];
  images: string[];
}

export default function ProfileCard() {
  const user = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState<profileInfoType>({
    name: user.displayName,
    age: 23,
    bio: user.bio,
    profession: "Professional model",
    rating: 70,
    interests: ["Yoga", "Swimming", "Run", "Tennis"],
    images: [],
  });
  useEffect(() => {
    // If userData is populated, or after timeout
    if (user !== initialState) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        const interests = InterestsHandler.intToInterests(user.interests);
        setProfileInfo({
          name: user.displayName,
          age: 23,
          bio: user.bio,
          profession: "Professional model",
          rating: 70,
          interests: interests,
          images: user.userImages,
        });
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center  w-full h-full ">
        <BounceLoader color="#C13D88" />
      </div>
    );
  }
  
  return (
    <div className="flex relative flex-col w-full h-full lg:flex-grow overflow-y-auto bg-white px-6 py-4 md:p-8 lg:p-7">
      <div className="absolute top-6 right-6 z-[10]">
        <EditProfileDialog
          profileInfo={profileInfo}
          setProfileInfo={setProfileInfo}
        />
      </div>
      <div className="mb-2">
        <div className="w-full h-fit py-4 relative top-0 lg:hidden flex items-center justify-center px-6">
          <h1 className="font-poppins text-[24px] font-bold">Profile</h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-wrap md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <ProfileHeader
          name={profileInfo.name}
          age={23}
          profession={profileInfo.profession}
          rating={70}
          isProfileCard={true}
        />
      </div>

      <div className="mb-8">
        <ProfileAbout bio={profileInfo.bio} />
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/2">
          <ProfileEditGallery
            profileInfo={profileInfo}
            setProfileInfo={setProfileInfo}
          />
        </div>
        <div className="lg:w-1/2">
          <MyInterests interests={profileInfo.interests} />
        </div>
      </div>
    </div>
  );
}
