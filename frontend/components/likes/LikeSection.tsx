import { TbArrowsSort } from "react-icons/tb";
import ProfileCard from "./ProfileCard";

const profiles = [
  {
    name: "Li Sa",
    age: 21,
    image: "/User1.svg",
  },
  {
    name: "Yahya",
    age: 20,
    image: "/User2.svg",
  },
  {
    name: "Hamid",
    age: 24,
    image: "/User3.svg",
  },
  {
    name: "Ren Ny",
    age: 25,
    image: "/User4.svg",
  },
  {
    name: "Li Sa",
    age: 21,
    image: "/User5.svg",
  },
  {
    name: "Chi mok",
    age: 20,
    image: "/User6.svg",
  },
  {
    name: "Hoa Hoa",
    age: 24,
    image: "/User7.svg",
  },
  {
    name: "Ren Ny",
    age: 25,
    image: "/User8.svg",
  },
];

export default function LikesSection() {
  return (
    <section className="bg-white w-full h-full lg:h-[90%] overflow-y-scroll rounded-none lg:rounded-3xl p-6 md:p-10 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl text-poppins font-bold text-gray-900">
            See who likes you
          </h1>
          <p className="text-gray-600 font-poppings mt-2">
            This is a list of people who have liked you and your matches.
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded-2xl">
          <TbArrowsSort className="w-6 h-6 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 custom:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
        {profiles.map((profile) => (
          <ProfileCard
            key={`${profile.name}-${profile.age}`}
            name={profile.name}
            age={profile.age}
            image={profile.image}
          />
        ))}
      </div>
    </section>
  );
}
