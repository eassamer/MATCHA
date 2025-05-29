"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { z } from "zod";
import { HiPencil } from "react-icons/hi2";
import { ArrowLeft } from "lucide-react";
import { profileInfoType } from "./profile-card";
import { MultiSelect } from "./multi-select";
import { InterestsHandler } from "@/lib/InterestsHandler";
import { interestsShifter } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setUser } from "@/lib/features/user/userSlice";
import { updateUser } from "@/hooks/users";

// Define validation schema
const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  bio: z.string().max(200, "Bio cannot exceed 200 characters").optional(),
  job: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfileDialog({
  profileInfo,
  setProfileInfo,
}: {
  profileInfo: profileInfoType;
  setProfileInfo: React.Dispatch<React.SetStateAction<profileInfoType>>;
}) {
  let interestOptions: { label: string; value: string }[] = [];
  interestsShifter.map((interest, index) => {
    interestOptions.push({ label: interest.name, value: interest.name });
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: profileInfo.name,
    bio: profileInfo.bio,
    job: profileInfo.profession,
    interests: profileInfo.interests,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileFormData, string>>
  >({});
  const [bioLength, setBioLength] = useState(formData.bio?.length || 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "bio") {
      setBioLength(value.length);
    }

    // Clear error when user types
    if (errors[name as keyof ProfileFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    try {
      profileSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ProfileFormData, string>> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof ProfileFormData;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleInterestsChange = (values: string[]) => {
    setFormData((prev) => ({
      ...prev,
      interests: values,
    }));

    // Clear error if it exists
    if (errors.interests) {
      setErrors((prev) => ({
        ...prev,
        interests: undefined,
      }));
    }
  };
  const handleSubmit = () => {
    if (validateForm()) {
      setProfileInfo({
        ...profileInfo,
        name: formData.displayName,
        bio: formData.bio || "",
        profession: formData.job || "",
        interests: formData.interests || [],
      });

      dispatch(
        setUser({
          ...user,

          displayName: formData.displayName,
          bio: formData.bio || "",
          interests: InterestsHandler.interestsToInt(formData.interests || []),
        })
      );
      updateUser({
        ...user,
        latitude: "3.13",
        longitude: "-77.13",
        displayName: formData.displayName,
        bio: formData.bio || "",
        interests: InterestsHandler.interestsToInt(formData.interests || []),
      }).catch((error) => {
        console.error("Error updating user:", error);
      });
      setOpen(false);
      // Show success message or notification here
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="icon"
        className="relative rounded-[11px]"
        style={{
          backgroundColor: "#C13D88",
          borderColor: "#C13D88",
          color: "white",
        }}
      >
        <HiPencil size={24} color="white" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 h-full lg:h-auto max-w-md lg:max-h-[80vh] lg:rounded-lg overflow-hidden">
          <DialogTitle className="sr-only">Edit Profile</DialogTitle>
          <div className="flex flex-col h-full">
            <div className="flex items-center p-4 border-b">
              <button
                onClick={() => setOpen(false)}
                className="bg-transparent rounded-[11px] border-2 border-[#E8E6EA] p-2 lg:p-3"
              >
                <ArrowLeft className="text-primary text-[18px] lg:text-[24px]" />
              </button>
              <h2 className="text-xl font-bold mx-auto pr-10">Edit Profile</h2>
            </div>

            <div className="p-4 space-y-4 ">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-semibold font-poppins">
                  Display Name
                </label>
                <Input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className={`rounded-lg font-poppins ${
                    errors.displayName ? "border-red-500" : ""
                  }`}
                />
                {errors.displayName && (
                  <p className="text-sm text-red-500 font-poppins">
                    {errors.displayName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-semibold font-poppins">
                  Bio
                </label>
                <div className="relative">
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className={`rounded-lg min-h-[100px] max-h-[130px] lg:max-h-[400px] font-poppins ${
                      errors.bio ? "border-red-500" : ""
                    }`}
                    maxLength={200}
                  />
                  <div className="text-xs text-gray-500 text-right font-poppins mt-1">
                    {bioLength} / 200 max
                  </div>
                </div>
                {errors.bio && (
                  <p className="text-sm text-red-500 font-poppins">
                    {errors.bio}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-500 font-semibold font-poppins">
                  Job
                </label>
                <Input
                  name="job"
                  value={formData.job}
                  onChange={handleInputChange}
                  className="rounded-lg font-poppins"
                />
                {errors.job && (
                  <p className="text-sm text-red-500 font-poppins">
                    {errors.job}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Interests</label>
                <MultiSelect
                  options={interestOptions}
                  defaultValue={formData.interests}
                  onValueChange={handleInterestsChange}
                  placeholder="Select your interests"
                  variant="custom"
                  animation={0.5}
                  maxCount={3}
                />
                {errors.interests && (
                  <p className="text-sm text-red-500">{errors.interests}</p>
                )}
              </div>
            </div>

            <div className="mt-auto p-4">
              <Button
                onClick={handleSubmit}
                className="w-full py-6 rounded-lg text-white font-bold font-poppins"
                style={{ backgroundColor: "#C13D88" }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
