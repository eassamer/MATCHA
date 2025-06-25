"use client";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { setUser } from "../lib/features/user/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { getLikes } from "@/hooks/likes";
import { setLikes, addLike, removeLike } from "@/lib/features/likes/likesSlice";
import { setUsersNearBy } from "@/lib/features/users/userNearBySlice";
import { getRelations } from "@/hooks/realtions";
import { updateLocation } from "@/hooks/users";
import socket from "@/lib/socket";

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
    let users = [];
    if (res.data.length > 0) {
      users = res.data.map((user: any) => {
        return {
          ...user,
          id: id++,
        };
      });
    }
    storeRef.current!.dispatch(setUsersNearBy(users));
  }

  async function updateNewLocation(coords: {
    latitude: number;
    longitude: number;
  }) {
    try {
      const res = await updateLocation(coords);
      if (res.data.latitude) {
        fetchRelations();
      }
      storeRef.current!.dispatch(setUser(res.data));
    } catch (error) {
      toast.error("An error occurred" + error);
    }
  }

  useEffect(() => {
    const handleLoad = () => {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        localStorage.removeItem("user");
        storeRef.current!.dispatch(setUser(parsedUser));

        socket.emit("getLikes");
      } else {
        axios
          .get(process.env.NEXT_PUBLIC_API_URL + "/users/user/me", {
            withCredentials: true,
          })
          .then((res) => {
            storeRef.current!.dispatch(setUser(res.data));
            socket.emit("getLikes");
          })
          .catch((err) => {
            toast.error("An error occurred: " + err.response?.data?.error);
          });
      }

      // 🛰️ Socket listeners
      socket.on("likesResponse", (data) => {
        storeRef.current!.dispatch(setLikes(data));
      });

      socket.on("like", (data) => {
        storeRef.current!.dispatch(addLike(data));
      });

      socket.on("match", (data) => {
        storeRef.current!.dispatch(removeLike(data));
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            updateNewLocation(coords);
          },
          async (error) => {
            try {
              const ipRes = await axios.get("https://geolocation-db.com/json/");
              const coords = {
                latitude: ipRes.data.latitude,
                longitude: ipRes.data.longitude,
              };
              updateNewLocation(coords);
            } catch (err) {
              console.error("Failed to get location from IP", err);
            }
          }
        );
      }
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }

    return () => {
      socket.off("likesResponse");
      socket.off("like");
      socket.off("likesError");
    };
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
