import { IoCheckmarkDoneOutline } from "react-icons/io5";

interface ProfileInterestsProps {
  interests: string[];
}

export default function MyInterests({ interests }: ProfileInterestsProps) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-3 font-poppins">Interests</h2>
      <div className="flex flex-wrap gap-2">
        {!interests.length && (
          <h1 className="text-sm font-medium font-poppins text-primary capitalize opacity-65">
            No Interests
          </h1>
        )}
        {interests.map((interest, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-[5px] border flex items-center gap-1.5 border-gray-200 text-[#E8E6EA]`}
          >
            <IoCheckmarkDoneOutline size={18} className="text-primary" />
            <span className="text-sm font-medium font-poppins text-primary capitalize">
              {interest}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
