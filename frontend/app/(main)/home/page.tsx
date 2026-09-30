"use client";
import DetailsCard from "@/components/profile/details-card";
import { SwipeButtons } from "@/components/home/SwipeButtons";
import { SwipeCard } from "@/components/home/SwipeCard";
import { useState } from "react";
import FilterButton from "@/components/home/FilterButton";
import RecentMessages from "@/components/messages/recent-messages";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchNearbyUsers } from "@/lib/features/users/userNearBySlice";
import { BounceLoader } from "react-spinners";

export default function Home() {
  const [direction, setDirection] = useState("");
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const { items: cards, status, error } = useAppSelector((state) => state.usersNearBy);
  const dispatch = useAppDispatch();
  const loading = status === "idle" || status === "loading";
  const ready = status === "ready";
  const topCard = cards[cards.length - 1];

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
          {loading && (
            <div
              data-testid="nearby-loader"
              className="size-full flex items-center justify-center"
            >
              <BounceLoader color="#C13D88" />
            </div>
          )}
          {status === "error" && (
            <div
              role="alert"
              className="size-full flex flex-col items-center justify-center gap-3 px-8 text-center"
            >
              <h2 className="font-poppins text-[22px] font-semibold">
                We couldn&apos;t load profiles
              </h2>
              <p className="font-poppins text-[14px] text-gray-500">{error}</p>
              <button
                type="button"
                onClick={() => dispatch(fetchNearbyUsers())}
                className="mt-2 rounded-[12px] bg-primary px-6 py-3 font-poppins font-bold text-white"
              >
                Try again
              </button>
            </div>
          )}
          {!showDetailsCard && (
            <div className="absolute top-4 right-4 hidden lg:block">
              <FilterButton />
            </div>
          )}
          {showDetailsCard && topCard && (
            <DetailsCard
              card={topCard}
              setShowDetailsCard={setShowDetailsCard}
              setDirection={setDirection}
            />
          )}
          {!showDetailsCard && ready && (
            <SwipeCard
              cards={cards}
              direction={direction}
              setShowDetailsCard={setShowDetailsCard}
              setDirection={setDirection}
            />
          )}
          {topCard && !showDetailsCard && ready && (
            <SwipeButtons
              card={topCard}
              setDirection={setDirection}
              setShowDetailsCard={setShowDetailsCard}
            />
          )}
        </div>
      </div>
    </div>
  );
}
