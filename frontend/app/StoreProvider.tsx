"use client";
import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import toast from "react-hot-toast";
import { makeStore, AppStore } from "@/lib/store";
import { fetchCurrentUser, setUser } from "@/lib/features/user/userSlice";
import { setLikes, addLike, removeLike } from "@/lib/features/likes/likesSlice";
import { fetchNearbyUsers } from "@/lib/features/users/userNearBySlice";
import { updateLocation } from "@/hooks/users";
import { getErrorMessage } from "@/lib/api";
import { requestCoordinates } from "@/lib/geolocation";
import socket from "@/lib/socket";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current!;
    let cancelled = false;

    // 1. who am I (the jwt cookie is sent automatically)
    store
      .dispatch(fetchCurrentUser())
      .unwrap()
      .then(() => socket.emit("getLikes"))
      .catch((error) => toast.error(getErrorMessage(error)));

    // 2. live updates
    const onLikesResponse = (data: unknown) => store.dispatch(setLikes(data as never));
    const onLike = (data: unknown) => store.dispatch(addLike(data as never));
    const onMatch = (data: unknown) => store.dispatch(removeLike(data as never));
    socket.on("likesResponse", onLikesResponse);
    socket.on("like", onLike);
    socket.on("match", onMatch);

    // 3. location (browser → IP fallback), then the suggestions deck.
    //    Suggestions are requested even without fresh coordinates: the backend
    //    uses the stored position and reports an error the page can show.
    (async () => {
      const coords = await requestCoordinates();
      if (cancelled) return;
      if (coords) {
        try {
          const user = await updateLocation(coords);
          if (!cancelled) store.dispatch(setUser(user));
        } catch (error) {
          toast.error(`Could not update your location: ${getErrorMessage(error)}`);
        }
      }
      if (!cancelled) store.dispatch(fetchNearbyUsers());
    })();

    return () => {
      cancelled = true;
      socket.off("likesResponse", onLikesResponse);
      socket.off("like", onLike);
      socket.off("match", onMatch);
    };
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
