import React, { useEffect, useState } from "react";
import { Card } from "../Card";
import { Setting5 } from "iconsax-react";
import { UserNearByType } from "@/lib/features/users/userNearBySlice";

export const SwipeCard = ({
  cards,
  direction,
  setDirection,
  setShowDetailsCard,
}: {
  cards: UserNearByType[];
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
      {cards.length > 0 &&
        cards[0].displayName != "" &&
        cards.map((card, id) => {
          return (
            <Card
              key={id}
              cards={cards}
              url={card.userImages[0]}
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
