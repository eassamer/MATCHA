import { IoCheckmarkDoneOutline } from "react-icons/io5";

interface Interest {
  name: string;
  selected: boolean;
}

interface ProfileInterestsProps {
  interests: Interest[];
}

export default function ProfileInterests({ interests }: ProfileInterestsProps) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-3 font-poppins">Interests</h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-[5px] border flex items-center gap-1.5 ${
              interest.selected
                ? "border-primary text-primary border-2"
                : "border-gray-200 text-[#E8E6EA]"
            }`}
          >
            {interest.selected && (
              <IoCheckmarkDoneOutline size={18} className="text-primary" />
            )}
            <span className="text-sm font-medium font-poppins">
              {interest.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
