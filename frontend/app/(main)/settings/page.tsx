'use client';
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {console.log(user)}, [user]);
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}

export default Settings;