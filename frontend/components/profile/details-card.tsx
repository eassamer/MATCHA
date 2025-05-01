"use client";

import type React from "react";
import { ArrowLeft } from "lucide-react";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileLocation from "@/components/profile/profile-location";
import ProfileAbout from "@/components/profile/profile-about";
import ProfileInterests from "@/components/profile/profile-interests";
import ProfileGallery from "@/components/profile/profile-gallery";
import { SwipeButtons } from "../home/SwipeButtons";
import { UserNearByType } from "@/lib/features/users/userNearBySlice";
import { calculateAge } from "../Card";

interface DetailsCardProps {
  card: UserNearByType;
  setShowDetailsCard: React.Dispatch<React.SetStateAction<boolean>>;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
}

export default function DetailsCard({
  card,
  setShowDetailsCard,
  setDirection,
}: DetailsCardProps) {
  return (
    <div className="flex flex-col w-full h-full lg:flex-grow overflow-y-auto bg-white px-6 py-4 md:p-8 lg:p-10">
      <div className="mb-6">
        <button
          onClick={() => setShowDetailsCard(false)}
          className="bg-transparent rounded-[11px] border-2 border-[#E8E6EA] p-2 lg:p-3"
        >
          <ArrowLeft className="text-primary text-[18px] lg:text-[24px]" />
        </button>
      </div>

      <div className="flex flex-col md:flex-wrap md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <ProfileHeader
          name={card.displayName}
          age={calculateAge(card.birthDate!)}
          rating={card.fameRating}
          profession="Professional model"
        />

        <ProfileLocation
          location="Chicago, IL United States"
          distance={card.distance.toFixed(0)}
        />
      </div>

      <div className="mb-8">
        <ProfileAbout bio="My name is Jessica Parker and I enjoy meeting new people and finding ways to help them have an uplifting experience. I enjoy reading.." />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/2">
          <ProfileGallery images={card.userImages} />
        </div>

        <div className="lg:w-1/2">
          <ProfileInterests
            interests={[
              {
                name: "Cats",
                selected: true,
              },
              {
                name: "Dogs",
                selected: false,
              },
              {
                name: "Art",
                selected: false,
              },
              {
                name: "Music",
                selected: false,
              },
            ]}
          />
        </div>
      </div>

      <div className="mt-auto w-full flex items-center justify-center">
        <SwipeButtons
          card={card}
          setDirection={setDirection}
          setShowDetailsCard={setShowDetailsCard}
        />
      </div>
    </div>
  );
}
