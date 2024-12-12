"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const Card = ({
  url,
  id,
  cards,
  setCards,
}: {
  url: string;
  id: number;
  cards: { id: number; url: string }[];
  setCards: React.Dispatch<React.SetStateAction<{ id: number; url: string }[]>>;
}) => {
  const x = useMotionValue(0);
  const rotateRaw = useTransform(x, [-100, 100], [-20, 20]);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);
  const isFront = id == cards[cards.length - 1].id;
  const rotate = useTransform(() => {
    const rotation = isFront ? 0 : id % 2 ? 3 : -3;
    return `${rotateRaw.get() + rotation}deg`;
  });
  const dragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setCards((cards) => cards.filter((card) => card.id !== id));
    }
  };
  return (
    <motion.img
      src={url}
      key={id}
      alt="card"
      className="h-96 w-72 object-cover rounded-lg hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        rotate,
        opacity,
        transition: "all 0.1s ease",
      }}
      drag="x"
      onDragEnd={dragEnd}
      dragConstraints={{ left: 0, right: 0 }}
    />
  );
};
