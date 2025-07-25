"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Location } from "iconsax-react";
export const Card = ({
  url,
  id,
  cards,
  setCards,
  direction,
  setDirection,
  setShowDetailsCard,
}: {
  url: string;
  id: number;
  cards: { id: number; url: string }[];
  setCards: React.Dispatch<React.SetStateAction<{ id: number; url: string }[]>>;
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  setShowDetailsCard: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0); // Add motion value for vertical movement
  const rotate = useTransform(x, [-100, 100], [-20, 20]);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

  const isFront = id === cards[cards.length - 1].id;

  useEffect(() => {
    if (isFront && direction === "right") {
      x.set(100);
      setTimeout(() => {
        setCards((cards) => cards.filter((card) => card.id !== id));
        setDirection("");
      }, 300);
    }
    if (isFront && direction === "left") {
      x.set(-100);
      setTimeout(() => {
        setCards((cards) => cards.filter((card) => card.id !== id));
        setDirection("");
      }, 300);
    }
    if (isFront && direction === "up") {
      y.set(-200); // Move the card upward off-screen
      setTimeout(() => {
        setCards((cards) => cards.filter((card) => card.id !== id));
        setDirection("");
      }, 300);
    }
  }, [direction]);

  const dragEnd = () => {
    const dragThreshold = 100;
    if (Math.abs(x.get()) > dragThreshold) {
      setCards((cards) => cards.filter((card) => card.id !== id));
    } else if (y.get() < -dragThreshold) {
      setCards((cards) => cards.filter((card) => card.id !== id));
    }
  };

  return (
    <motion.div
      style={{
        gridRow: 1,
        gridColumn: 1,
        rotate,
        opacity,
        x,
        y,
        transition: direction.length > 0 ? "all 0.2s ease-in-out" : "none",
      }}
      onClick={() => {
        setShowDetailsCard(true);
      }}
      drag
      dragMomentum={false}
      onDragEnd={dragEnd}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      className="w-fit h-fit relative flex items-center justify-end hover:cursor-grab active:cursor-grabbing"
    >
      <div className="z-99 absolute flex items-center gap-1 justify-center top-3 left-3 w-fit px-2 h-[35px] bg-[#000000CF] rounded-[7px]">
        <Location size="16" color="#FFFFFF" />
        <h1 className="text-[12px] font-bold font-poppins text-white">
          Ifrane, Ma
        </h1>
      </div>
      <div className="z-99 absolute w-full h-[22%] bottom-0 bg-[#00000026] rounded-b-lg flex flex-col items-start justify-center px-4">
        <h1 className="text-[24px] font-bold font-poppins text-white">
          Yahya Zaml, 25
        </h1>
        <h1 className="text-[14px] font-regular font-poppins text-white">
          Professional whore
        </h1>
      </div>
      <img
        draggable={false}
        src={url}
        key={id}
        alt="card"
        className="h-[400px] w-[280px] lg:h-[400px] lg:w-[260px]  xl:h-[450px] xl:w-[300px] object-cover rounded-lg"
        style={{
          opacity: 1,
        }}
      />
    </motion.div>
  );
};
