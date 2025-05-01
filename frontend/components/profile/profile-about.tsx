"use client";

import { useState } from "react";

interface ProfileAboutProps {
  bio: string;
}

export default function ProfileAbout({ bio }: ProfileAboutProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <h2 className="font-bold text-lg mb-2 font-poppins">About</h2>
      {bio?.length ? (
        <p className="text-gray-700 text-sm lg:text-base font-normal font-poppins">
          {expanded ? bio : bio.slice(0, 100) + "..."}
        </p>
      ) : (
        <p className="text-gray-700 text-sm lg:text-base font-normal font-poppins">
          No bio
        </p>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary font-medium text-sm mt-1 font-poppins"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
