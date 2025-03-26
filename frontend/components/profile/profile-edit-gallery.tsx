"use client";
import Image from "next/image";
import { HiPencil } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";

export default function ProfileEditGallery() {
  const images = ["/User1.svg", "/User2.svg", "/User3.svg"];

  const handleUploadImage = (index: number) => {
    console.log(`Upload image for slot ${index}`);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert("File size must be 2MB or less.");
          return;
        }
      }
    };
    input.click();
  };

  const gallerySlots = Array(5)
    .fill(null)
    .map((_, index) => ({
      index,
      image: index < images.length ? images[index] : null,
    }));

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Gallery</h2>

      <div className="grid grid-cols-2 gap-3">
        {gallerySlots.map((slot) => (
          <div
            key={slot.index}
            className={`relative rounded-lg overflow-hidden ${
              slot.image ? "" : "bg-muted"
            } ${slot.index < 2 ? "aspect-[3/4]" : "aspect-square"}`}
          >
            {slot.image ? (
              <>
                <Image
                  src={slot.image || "/placeholder.svg"}
                  alt={`Gallery image ${slot.index + 1}`}
                  width={300}
                  height={slot.index < 2 ? 400 : 300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => handleUploadImage(slot.index)}
                    className="border-2 bprder-white bg-transparent rounded-full p-3 shadow-md"
                    aria-label="Edit image"
                  >
                    <HiPencil size={24} className="text-white" />
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <button
                  onClick={() => handleUploadImage(slot.index)}
                  className="rounded-full p-4 border-2 border-primary flex items-center justify-center"
                  aria-label="Add image"
                >
                  <FiPlus size={24} className="text-primary" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
