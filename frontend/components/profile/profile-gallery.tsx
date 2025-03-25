"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./image-lightbox";

export default function ProfileGallery() {
  // Sample gallery images - replace with your actual images
  const images = [
    "/User1.svg",
    "/User2.svg",
    "/User3.svg",
    "/User4.svg",
    "/User5.svg",
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      if (e.key === "ArrowLeft")
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  return (
    <div>
      <h2 className="font-bold text-lg mb-3 font-sans">Gallery</h2>

      <div className="grid grid-cols-2 gap-2">
        <div
          className="relative rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <Image
            src={images[0] || "/placeholder.svg"}
            alt="Gallery image 1"
            width={300}
            height={400}
            className="w-full h-full object-cover aspect-[3/4]"
          />
        </div>
        <div
          className="relative rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openLightbox(1)}
        >
          <Image
            src={images[1] || "/placeholder.svg"}
            alt="Gallery image 2"
            width={300}
            height={400}
            className="w-full h-full object-cover aspect-[3/4]"
          />
        </div>

        <div
          className="relative rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openLightbox(2)}
        >
          <Image
            src={images[2] || "/placeholder.svg"}
            alt="Gallery image 3"
            width={300}
            height={300}
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        <div
          className="relative rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openLightbox(3)}
        >
          <Image
            src={images[3] || "/placeholder.svg"}
            alt="Gallery image 4"
            width={300}
            height={300}
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        <div
          className="relative rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openLightbox(4)}
        >
          <Image
            src={images[4] || "/placeholder.svg"}
            alt="Gallery image 5"
            width={300}
            height={300}
            className="w-full h-full object-cover aspect-square"
          />
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
          onSelectImage={selectImage}
        />
      )}
    </div>
  );
}
