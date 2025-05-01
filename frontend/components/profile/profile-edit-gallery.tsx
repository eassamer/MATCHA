"use client";

import { useState } from "react";
import Image from "next/image";
import { Pencil, Plus, Upload, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { profileInfoType } from "./profile-card";

export default function ProfileEditGallery({
  profileInfo,
  setProfileInfo,
}: {
  profileInfo: profileInfoType;
  setProfileInfo: React.Dispatch<React.SetStateAction<profileInfoType>>;
}) {
  const [images, setImages] = useState<string[]>(profileInfo.images);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUploadImage = (index: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          alert("File size must be 5MB or less.");
          return;
        }

        // In a real app, you would upload the file to a server
        // For now, we'll just create a local URL
        const imageUrl = URL.createObjectURL(file);

        // If we're replacing an existing image
        if (index < images.length) {
          const newImages = [...images];
          newImages[index] = imageUrl;
          setImages(newImages);
        } else {
          // If we're adding a new image
          setImages([...images, imageUrl]);
          setProfileInfo({
            ...profileInfo,
            images: [...images, imageUrl],
          });
        }

        setIsDialogOpen(false);
      }
    };
    input.click();
  };

  const handleDeleteImage = (index: number) => {
    // Remove the image at the specified index and shift all subsequent images
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setProfileInfo({
      ...profileInfo,
      images: newImages,
    });
    setIsDialogOpen(false);
  };

  const openImageDialog = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
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
                    onClick={() => openImageDialog(slot.index)}
                    className="border-2 border-white bg-black/30 rounded-full p-3 shadow-md hover:bg-black/50 transition-colors"
                    aria-label="Edit image"
                  >
                    <Pencil size={24} className="text-white" />
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <button
                  onClick={() => handleUploadImage(slot.index)}
                  className="rounded-full p-4 border-2 border-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label="Add image"
                >
                  <Plus size={24} className="text-primary" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[80%] lg:w-[400px] rounded-[13px] ">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-3 py-4">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2"
              onClick={() =>
                selectedImageIndex !== null &&
                handleUploadImage(selectedImageIndex)
              }
            >
              <Upload size={18} />
              <span>Upload New Image</span>
            </Button>
            <Button
              variant="destructive"
              className="flex items-center justify-start gap-2"
              onClick={() =>
                selectedImageIndex !== null &&
                handleDeleteImage(selectedImageIndex)
              }
            >
              <Trash2 size={18} />
              <span>Delete Image</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
