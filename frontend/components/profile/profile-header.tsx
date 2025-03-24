interface ProfileHeaderProps {
  name: string;
  age: number;
  profession: string;
}

export default function ProfileHeader({
  name,
  age,
  profession,
}: ProfileHeaderProps) {
  return (
    <div>
      <h1 className="font-bold text-2xl lg:text-3xl font-poppins">
        {name}, {age}
      </h1>
      <p className="text-gray-600 text-sm lg:text-base font-normal font-poppins">
        {profession}
      </p>
    </div>
  );
}
