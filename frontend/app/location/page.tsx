"use client";

import { useEffect, useState } from "react";
import axios from "axios";
export default function Page() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if (position) {
      console.log(position);
    }
  }, [position]);
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log("User denied location access");
            try {
              axios.get("/api/location").then((res) => {
                console.log(res.data);
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      );
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-black">
      {position && (
        <div className="w-[300px] h-20 flex flex-col items-center justify-center">
          <p className="text-white font-montserrat font-bold text-lg">
            Latitude: {position.coords.latitude}
          </p>
          <p className="text-white font-montserrat font-bold text-lg">
            Longitude: {position.coords.longitude}
          </p>
        </div>
      )}
      <button onClick={handleClick} className="bg-white px-4 rounded-sm py-2">
        Get Location
      </button>
    </div>
  );
}
