import { Activity } from "lucide-react";
import ProfileCard from "./ProfileCard";

const profiles = [
  {
    name: "Li Sa",
    age: 21,
    image: "/placeholder.svg?height=400&width=300",
    isMatch: false,
  },
  {
    name: "Yahya",
    age: 20,
    image: "/placeholder.svg?height=400&width=300",
    isMatch: false,
  },
  {
    name: "Hamid",
    age: 24,
    image: "/placeholder.svg?height=400&width=300",
    isMatch: true,
  },
  {
    name: "Ren Ny",
    age: 25,
    image: "/placeholder.svg?height=400&width=300",
    isMatch: false,
  },
  {
    name: "Li Sa",
    age: 21,
    image: "/placeholder.svg?height=400&width=300",
    isMatch: false,
  },
  {
    name: "Chi mok",
    age: 20,
    image: "/placeholder.svg?height=400&width=300",
    isMatch: false,
  },
  {
    name: "Hoa Hoa",
    age: 24,
    image: "/placeholder.svg?height=400&width=300",
    isMatch: true,
  },
  {
    name: "Ren Ny",
    age: 25,
    image: "/placeholder.svg?height=400&width=300",
    isMatch: false,
  },
];

export default function LikesSection() {
  return (
    <section className="bg-white w-full h-full lg:h-[90%] rounded-3xl p-6 md:p-10 shadow-sm">
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
          <Activity className="w-6 h-6 text-pink-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
        {profiles.map((profile) => (
          <ProfileCard
            key={`${profile.name}-${profile.age}`}
            name={profile.name}
            age={profile.age}
            image={profile.image}
            isMatch={profile.isMatch}
          />
        ))}
      </div>
    </section>
  );
}
