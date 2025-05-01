"use client";

import { useState } from "react";
import { Setting5 } from "iconsax-react";
import { ChevronLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function FilterDialog() {
  // State for filter values
  const [distance, setDistance] = useState(70);
  const [ageRange, setAgeRange] = useState([24, 38]);
  const [gender, setGender] = useState("female");
  const [open, setOpen] = useState(false);

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  // Handle save filters
  const handleSaveFilters = () => {
    // Save filter logic would go here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className=" bg-transparent rounded-[11px] border-2 border-[#E8E6EA]  p-2 lg:p-3">
          <Setting5
            className="self-end text-[18px] lg:text-[24px]"
            color="#C13D88"
            variant="Bold"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full  h-full lg:h-[700px] lg:max-w-md p-0 border-none bg-white rounded-0 lg:rounded-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={handleClose}
              className="p-3 rounded-[11px] border-2 border-[#E8E6EA]"
              aria-label="Close filters"
            >
              <ChevronLeft className="h-5 w-5 text-primary" />
            </button>
            <DialogTitle className="text-2xl font-bold flex-1 text-center">
              Filters
            </DialogTitle>
            <div className="w-12"></div>
          </div>

          <div className="p-6 space-y-10 flex-1 overflow-auto">
            <div className="space-y-6">
              <h3 className="font-poppins text-2xl font-bold">Distance</h3>
              <div className="space-y-4">
                <Slider
                  value={[distance]}
                  onValueChange={(value) => setDistance(value[0])}
                  max={100}
                  step={1}
                  className="[&_.slider-thumb]:bg-[#C13D88] [&_.slider-track]:bg-[#C13D88]/30 [&_.slider-range]:bg-[#C13D88]"
                />
                <div className="font-poppins text-right text-xl font-semibold">
                  {distance} km
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-poppins text-2xl font-bold">Age</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-poppins text-xl font-semibold">
                    {ageRange[0]}
                  </span>
                  <span className="font-poppins text-xl font-semibold">
                    {ageRange[1]}
                  </span>
                </div>
                <Slider
                  value={ageRange}
                  onValueChange={setAgeRange}
                  min={18}
                  max={99}
                  step={1}
                  className="[&_.slider-thumb]:bg-[#C13D88] [&_.slider-track]:bg-[#C13D88]/30 [&_.slider-range]:bg-[#C13D88]"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-poppins text-2xl font-bold">Gender</h3>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-[200px] h-10 px-4 gap-6 text-[20px] font-poppins font-bold border-1 border-[#E8E6EA] rounded-[11px]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    className="font-poppins font-semibold text-[15px]"
                    value="female"
                  >
                    Female
                  </SelectItem>
                  <SelectItem
                    className="font-poppins font-semibold text-[15px]"
                    value="male"
                  >
                    Male
                  </SelectItem>
                  <SelectItem
                    className="font-poppins font-semibold text-[15px]"
                    value="all"
                  >
                    All
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-6 mt-auto">
            <Button
              onClick={handleSaveFilters}
              className="w-full h-16 text-xl font-poppins font-semibold bg-[#C13D88] hover:bg-[#A82E73] text-white rounded-[11px]"
            >
              Save Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
