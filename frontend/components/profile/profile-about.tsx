"use client";

import { useState } from "react";

interface ProfileAboutProps {
  description: string;
}

export default function ProfileAbout({ description }: ProfileAboutProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <h2 className="font-bold text-lg mb-2 font-poppins">About</h2>
      <p className="text-gray-700 text-sm lg:text-base font-normal font-poppins">
        {expanded ? description : description.slice(0, 100) + "..."}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary font-medium text-sm mt-1 font-poppins"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
