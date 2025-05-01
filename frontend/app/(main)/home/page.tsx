"use client";
import DetailsCard from "@/components/profile/details-card";
import { SwipeButtons } from "@/components/home/SwipeButtons";
import { SwipeCard } from "@/components/home/SwipeCard";
import { useEffect, useState } from "react";
import FilterButton from "@/components/home/FilterButton";
import RecentMessages from "@/components/messages/recent-messages";
import { useAppSelector } from "@/lib/hooks";
import { BounceLoader } from "react-spinners";

export default function Home() {
  const [direction, setDirection] = useState("");
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const cards = useAppSelector((state) => state.usersNearBy.usersNearBy);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (cards.length == 1 && cards[0].displayName == "") {
      setLoader(true);
    } else {
      setLoader(false);
    }
  });
  return (
    <div className="size-full lg:pt-14 pt-0 bg-[#F3F4F8] lg:px-10 px-0 flex flex-col items-start justify-start gap-6">
      <h1 className="hidden lg:block font-poppins text-[34px] font-bold">
        Discover
      </h1>
      <div className="w-full lg:max-h-[calc(100vh-60px)]  h-[calc(100vh-60px)] lg:h-[80%] flex-grow lg:flex-grow  flex items-center justify-between">
        <div className="custom:hidden lg:max-h-[86vh] lg:flex hidden w-[300px] h-[90%] bg-white rounded-[12.6px]">
          <RecentMessages />
        </div>
        <div
          style={{
            padding: showDetailsCard ? "0px" : "10px 0px 10px 0px",
          }}
          className="custom:w-full w-full lg:relative overflow-hidden lg:w-[calc(100%-330px)] lg:max-h-[86vh] h-[calc(100vh-60px)] lg:h-[90%] flex flex-col items-center justify-between lg:justify-center lg:py-0  lg:gap-6 bg-white  rounded-0 lg:rounded-[12.6px]"
        >
          {!showDetailsCard && (
            <div className="w-full h-fit py-4 relative top-0 lg:hidden flex items-center justify-center px-6">
              <div className="size-fit absolute left-6 lg:hidden">
                <FilterButton />
              </div>
              <h1 className="font-poppins text-[24px] font-bold">Discover</h1>
            </div>
          )}
          {!showDetailsCard && (
            <div className="absolute top-4 right-4 hidden lg:block">
              <FilterButton />
            </div>
          )}
          {showDetailsCard && (
            <DetailsCard
              card={cards[cards.length - 1]}
              setShowDetailsCard={setShowDetailsCard}
              setDirection={setDirection}
            />
          )}
          {!showDetailsCard && !loader && (
            <SwipeCard
              cards={cards}
              direction={direction}
              setShowDetailsCard={setShowDetailsCard}
              setDirection={setDirection}
            />
          )}
          {!showDetailsCard && !loader && (
            <SwipeButtons
              card={cards[cards.length - 1]}
              setDirection={setDirection}
              setShowDetailsCard={setShowDetailsCard}
            />
          )}
          {loader && <BounceLoader color="#C13D88" />}
        </div>
      </div>
    </div>
  );
}
