import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import likesReducer from "./features/likes/likesSlice";
import matchesReducer from "./features/matches/matchesSlice";
import usersNearByReducer from "./features/users/userNearBySlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      matches: matchesReducer,
      // messages: messagesReducer,
      // notifications: notificationsReducer,
      likes: likesReducer,
      usersNearBy: usersNearByReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
