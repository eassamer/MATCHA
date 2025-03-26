"use client";

import type React from "react";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileAbout from "@/components/profile/profile-about";
import ProfileInterests from "@/components/profile/profile-interests";
import ProfileEditGallery from "./profile-edit-gallery";
import EditProfileDialog from "./edit-profile-dialog";
import { useState } from "react";

export interface profileInfoType {
  name: string;
  age: number;
  bio: string;
  profession: string;
  rating: number;
  interests: string[];
}

export default function ProfileCard() {
  const [profileInfo, setProfileInfo] = useState({
    name: "Jessica Parker",
    age: 23,
    bio: "My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading..",
    profession: "Professional model",
    rating: 70,
    interests: ["yoga", "sports", "music", "adventure"],
  });
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
        <ProfileAbout description={profileInfo.bio} />
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/2">
          <ProfileEditGallery />
        </div>
        <div className="lg:w-1/2">
          {/* <ProfileInterests interests={profileInfo.interests} /> */}
        </div>
      </div>
    </div>
  );
}
