"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export const Card = ({
  url,
  id,
  cards,
  setCards,
  direction,
  setDirection,
  sizeButton,
  setSizeButton,
}: {
  url: string;
  id: number;
  cards: { id: number; url: string }[];
  setCards: React.Dispatch<React.SetStateAction<{ id: number; url: string }[]>>;
  direction: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  sizeButton: number;
  setSizeButton: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-20, 20]);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
  const isFront = id == cards[cards.length - 1].id;
  useEffect(() => {
    setSizeButton(x.get());
  }, [x.get()]);
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
  }, [direction]);
  const dragEnd = () => {
    setSizeButton(0);
    if (Math.abs(x.get()) > 100) {
      setCards((cards) => cards.filter((card) => card.id !== id));
    }
  };
  return (
    <motion.img
      src={url}
      key={id}
      alt="card"
      className="h-[420px] w-[340px] object-cover rounded-lg hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        rotate,
        opacity,
        transition: sizeButton == 0 ? "all 0.1s ease-in-out" : "",
      }}
      onDrag={() => {
        setSizeButton(x.get());
      }}
      drag="x"
      onDragEnd={dragEnd}
      dragConstraints={{ left: 0, right: 0 }}
    />
  );
};
