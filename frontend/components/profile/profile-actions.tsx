import { X, Heart, Star } from "lucide-react"

export default function ProfileActions() {
  return (
    <div className="flex justify-center items-center gap-4">
      <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
        <X size={24} className="text-orange-500" />
      </button>

      <button className="w-16 h-16 flex items-center justify-center bg-primary rounded-full shadow-md">
        <Heart size={32} className="text-white" />
      </button>

      <button className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
        <Star size={24} className="text-purple-600" />
      </button>
    </div>
  )
}

