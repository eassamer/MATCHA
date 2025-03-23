import { MapPin } from "lucide-react";

interface ProfileLocationProps {
  location: string;
  distance: string;
}

export default function ProfileLocation({
  location,
  distance,
}: ProfileLocationProps) {
  return (
    <div className="flex flex-col items-start">
      <h2 className="font-bold text-base lg:text-lg font-poppins">Location</h2>
      <div className="flex items-center justify-between w-full gap-4">
        <p className="text-gray-600 text-sm lg:text-base font-normal font-poppins">
          {location}
        </p>

        <div className="flex items-center px-3 py-2 bg-primary/10 rounded-lg">
          <MapPin size={15} className="text-primary" />
          <span className="ml-1 font-bold text-primary text-sm font-poppins">
            {distance}
          </span>
        </div>
      </div>
    </div>
  );
}
