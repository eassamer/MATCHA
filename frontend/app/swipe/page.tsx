"use client";
import { Card } from "@/components/Card";
import { useEffect, useState } from "react";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { FaHeart, FaStar } from "react-icons/fa";

const cardData = [
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

export default function Swipe() {
  const [cards, setCards] = useState(cardData);
  const [direction, setDirection] = useState("");
  const [sizeButton, setSizeButton] = useState(0);

  return (
    <div className="w-screen h-screen bg-[#F9F9F9] flex items-center justify-center gap-12 flex-col">
      <div className="h-[420px] w-[310px] grid place-items-center">
        {!cards.length && (
          <h1 className="text-2xl font-bold font-montserrat text-white">
            No more users
          </h1>
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
              sizeButton={sizeButton}
              setSizeButton={setSizeButton}
            />
          );
        })}
      </div>
      <div className="w-fit h-[200px]  flex items-center justify-center gap-24">
        <button
          onClick={() => setDirection("left")}
          style={{
            width: 75,
            height: 75,
            maxWidth: 175,
            maxHeight: 175,
            minWidth: 45,
            minHeight: 45,
          }}
          className=" [box-shadow:0px_20px_50px_0px_rgba(0,0,0,0.07)] text-xl font-bold font-montserrat bg-white rounded-full flex items-center justify-center"
        >
          <FaXmark size={28} color="#F27121" />
        </button>
        <button
          onClick={() => setDirection("up")}
          style={{
            minWidth: 45,
            minHeight: 45,
            width: 75,
            height: 75,
            maxWidth: 175,
            maxHeight: 175,
          }}
          className=" [box-shadow:0px_15px_15px_0px_rgba(233,64,87,0.2)] text-xl font-bold font-montserrat bg-primary rounded-full flex items-center justify-center"
        >
          <FaHeart size={28} color="white" />
        </button>
        <button
          onClick={() => setDirection("right")}
          style={{
            minWidth: 45,
            minHeight: 45,
            width: 75,
            height: 75,
            maxWidth: 175,
            maxHeight: 175,
          }}
          className=" [box-shadow:0px_20px_50px_0px_rgba(0,0,0,0.07)] text-xl font-bold font-montserrat bg-white rounded-full flex items-center justify-center"
        >
          <FaStar size={28} color="#F27121" />
        </button>
      </div>
    </div>
  );
}
