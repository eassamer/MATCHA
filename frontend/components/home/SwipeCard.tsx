import React from "react";
import { Card } from "../Card";
import { Setting5 } from "iconsax-react";

export const cardData = [
  {
    id: 1,
    url: "/User1.svg",
  },
  {
    id: 2,
    url: "/User2.svg",
  },
  {
    id: 3,
    url: "/User3.svg",
  },
  {
    id: 4,
    url: "/User4.svg",
  },
  {
    id: 5,
    url: "/User5.svg",
  },
  {
    id: 6,
    url: "/User6.svg",
  },
  {
    id: 7,
    url: "/User7.svg",
  },
  {
    id: 8,
    url: "/User8.svg",
  },
  {
    id: 9,
    url: "/User9.svg",
  },
  {
    id: 10,
    url: "/User10.svg",
  },
];
export const SwipeCard = ({
  cards,
  setCards,
  direction,
  setDirection,
  setShowDetailsCard,
}: {
  cards: { id: number; url: string }[];
  setCards: React.Dispatch<React.SetStateAction<{ id: number; url: string }[]>>;
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  setShowDetailsCard: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="h-[400px] w-[280px] lg:h-[400px] lg:w-[260px]  xl:h-[450px] xl:w-[300px] grid place-items-center">
      {!cards.length && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="font-poppins text-[24.4px] font-semibold text-center">
            No more users to swipe
          </h1>
          <h1 className="font-poppins text-[14.4px] font-regular">
            change filters to see more
          </h1>
          <button className="font-poppins text-[14.4px] flex items-center justify-center gap-4 font-semibold text-white bg-primary py-3 px-7 rounded-full">
            Filters <Setting5 size="24" color="white" variant="Bold" />
          </button>
        </div>
      )}
      {cards.map((card) => {
        return (
          <Card
            key={card.id}
            cards={cards}
            setCards={setCards}
            url={card.url}
            id={card.id}
            direction={direction}
            setDirection={setDirection}
            setShowDetailsCard={setShowDetailsCard}
          />
        );
      })}
    </div>
  );
};
