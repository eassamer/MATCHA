"use client";

import type React from "react";
import { ArrowLeft } from "lucide-react";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileLocation from "@/components/profile/profile-location";
import ProfileAbout from "@/components/profile/profile-about";
import ProfileInterests from "@/components/profile/profile-interests";
import ProfileGallery from "@/components/profile/profile-gallery";
import ProfileActions from "@/components/profile/profile-actions";
import { SwipeButtons } from "../home/SwipeButtons";

interface DetailsCardProps {
  setShowDetailsCard: React.Dispatch<React.SetStateAction<boolean>>;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
}

export default function DetailsCard({
  setShowDetailsCard,
  setDirection,
}: DetailsCardProps) {
  return (
    <div className="flex flex-col w-full h-full lg:flex-grow overflow-y-auto bg-white p-6 md:p-8 lg:p-10">
      {/* Back Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowDetailsCard(false)}
          className="bg-transparent rounded-[11px] border-2 border-[#E8E6EA] p-3"
        >
          <ArrowLeft size="24" className="text-primary" />
        </button>
      </div>

      {/* Profile Header and Location */}
      <div className="flex flex-col md:flex-wrap md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <ProfileHeader
          name="Jessica Parker"
          age={23}
          profession="Professional model"
        />

        <ProfileLocation location="Chicago, IL United States" distance="1 km" />
      </div>

      {/* Profile About */}
      <div className="mb-8">
        <ProfileAbout description="My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading.." />
      </div>

      {/* Gallery and Interests - Two Column Layout for Desktop */}
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/2">
          <ProfileGallery />
        </div>

        <div className="lg:w-1/2">
          <ProfileInterests
            interests={[
              { name: "Travelling", selected: true },
              { name: "Books", selected: true },
              { name: "Music", selected: false },
              { name: "Dancing", selected: false },
              { name: "Modeling", selected: false },
            ]}
          />
        </div>
      </div>

      {/* Profile Actions */}
      <div className="mt-auto w-full flex items-center justify-center">
        <SwipeButtons
          setDirection={setDirection}
          setShowDetailsCard={setShowDetailsCard}
        />
      </div>
    </div>
  );
}
