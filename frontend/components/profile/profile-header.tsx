interface ProfileHeaderProps {
  name: string;
  age: number;
  profession: string;
  rating: number;
  isProfileCard?: boolean;
}

export default function ProfileHeader({
  name,
  age,
  profession,
  rating,
  isProfileCard = false,
}: ProfileHeaderProps) {
  return (
    <div>
      {isProfileCard && <h1 className="font-bold font-poppins">Profile</h1>}
      <h1 className="font-bold text-2xl lg:text-3xl font-poppins">
        {name}, {age}
      </h1>

      {profession && (
        <p className="text-gray-600 text-sm lg:text-base font-normal font-poppins">
          {profession}
        </p>
      )}
      <h1 className="font-semibold text-[16px] font-poppins mt-2">
        Fame Rating: <span className="text-primary">{rating}%</span>
      </h1>
    </div>
  );
}
