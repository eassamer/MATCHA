"use client";
import DetailsCard from "@/components/profile/details-card";
import { SwipeButtons } from "@/components/home/SwipeButtons";
import { cardData, SwipeCard } from "@/components/home/SwipeCard";
import { Setting5 } from "iconsax-react";
import { useState } from "react";

export default function Home() {
  const [cards, setCards] = useState(cardData);
  const [direction, setDirection] = useState("");
  const [sizeButton, setSizeButton] = useState(0);
  const [showDetailsCard, setShowDetailsCard] = useState(false);

  return (
    <div className="size-full lg:pt-14 pt-0 bg-[#F3F4F8] lg:px-10 px-0 flex flex-col items-start justify-start gap-6">
      <h1 className="hidden lg:block font-poppins text-[34px] font-bold">
        Discover
      </h1>
      <div className="w-full lg:h-fit flex-grow lg:flex-grow  flex items-center justify-between">
        <div className="custom:hidden lg:flex hidden w-[300px] h-[90%] bg-white rounded-[12.6px] py-6 px-4">
          <h1 className="font-poppins text-[14.4px] font-semibold">Messages</h1>
        </div>
        <div
          style={{
            padding: showDetailsCard ? "0px" : "10px 0px 10px 0px",
          }}
          className="custom:w-full w-full lg:relative overflow-hidden lg:w-[calc(100%-330px)] lg:max-h-[86vh] h-[calc(100vh-60px)] lg:h-[90%] flex flex-col items-center justify-between lg:justify-center lg:py-0  lg:gap-6 bg-white  rounded-0 lg:rounded-[12.6px]"
        >
          {!showDetailsCard && (
            <div className="w-full h-fit py-4 relative top-0 lg:hidden flex items-center justify-center px-6">
              <button className="absolute right-8 lg:hidden bg-transparent rounded-[11px] border-2 border-[#E8E6EA] p-3">
                <Setting5
                  className=" self-end"
                  size="24"
                  color="#C13D88"
                  variant="Bold"
                />
              </button>
              <h1 className="font-poppins text-[24px] font-bold">Discover</h1>
            </div>
          )}
          {!showDetailsCard && (
            <button className="hidden lg:block lg:absolute top-7 right-7 bg-transparent rounded-[11px] border-2 border-[#E8E6EA] p-3">
              <Setting5 size="24" color="#C13D88" variant="Bold" />
            </button>
          )}
          {showDetailsCard && (
            <DetailsCard
              setShowDetailsCard={setShowDetailsCard}
              setDirection={setDirection}
            />
          )}
          {!showDetailsCard && (
            <SwipeCard
              cards={cards}
              setCards={setCards}
              direction={direction}
              setShowDetailsCard={setShowDetailsCard}
              setDirection={setDirection}
            />
          )}
          {!showDetailsCard && (
            <SwipeButtons
              setDirection={setDirection}
              setShowDetailsCard={setShowDetailsCard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
