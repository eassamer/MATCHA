"use client";
import axios from "axios";

export default function Auth() {
  const auth42 = async () => {
    try {
      const res = await axios.get("http://localhost:3001/auth/42");
      console.log(res);
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
