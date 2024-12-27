import { SectionTitle } from "./SectionTitle";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  const Features = [
    {
      title: "Meet",
      desciprition: "Meet new people and match with them to know them more",
      image: "/Meet.svg",
    },
    {
      title: "Discover",
      desciprition: "Meet new people and match with them to know them more",
      image: "/Discover.svg",
    },
    {
      title: "Privacy",
      desciprition:
        "Im Just typing shit here to make it good nadafak ou solo rabat 3la mok",
      image: "/PrivacyC.svg",
    },
  ];
  return (
    <div
      id="features"
      className="w-full h-fit  py-8 flex flex-col items-center justify-start gap-12 px-8 lg:px-24"
    >
      <SectionTitle title="Our features" />
      <div className="w-full h-full flex-col lg:flex-row flex items-center  justify-center gap-12">
        {Features.map((item, index) => (
          <FeatureCard
            key={index}
            title={item.title}
            description={item.desciprition}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};
