"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router = useRouter();
  const auth42 = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
      const res = await axios.get("http://localhost:3001/auth/google");
      router.push(res.data.authUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <button
        onClick={() => auth42()}
        className="text-black font-bold bg-gray-200 rounded-md px-6 py-4"
      >
        Login With 42
      </button>
    </div>
  );
}
