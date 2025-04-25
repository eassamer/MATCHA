"use client";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { setUser } from "../lib/features/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { getLikes } from "@/hooks/likes";
import { useAppDispatch } from "@/lib/hooks";
import { setLikes } from "@/lib/features/likes/likesSlice";
import { setUsersNearBy } from "@/lib/features/users/userNearBySlice";
import { getRelations } from "@/hooks/realtions";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  async function fetchLikes() {
    const res = await getLikes();
    storeRef.current!.dispatch(setLikes(res.data));
  }
  async function fetchRelations() {
    const res = await getRelations();
    // add id to each res.data + res.data
    let id = 0;
    const users = res.data.map((user: any) => {
      return {
        ...user,
        id: id++,
      };
    });
    storeRef.current!.dispatch(setUsersNearBy(users));
  }
  useEffect(() => {
    const handleLoad = () => {
      const user = localStorage.getItem("user");
      if (user) {
        localStorage.removeItem("user");
        storeRef.current!.dispatch(setUser(JSON.parse(user)));
      } else {
        axios
          .get(process.env.NEXT_PUBLIC_API_URL + "/users/user/me", {
            withCredentials: true,
          })
          .then((res) => {
            storeRef.current!.dispatch(setUser(res.data));
          })
          .catch((err) => {
            toast.error("An error occurred" + err.response.data.error);
          });
        fetchRelations();
        fetchLikes();
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
