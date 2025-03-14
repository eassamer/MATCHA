import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  bio: string;
  birthdate: Date;
  createdAt: Date;
  displayName: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  includingRange: number;
  interests: number;
  lastName: string;
  latitude: string;
  longitude: string;
  radiusInKm: number;
  sex: string;
  userId: string;
}

const initialState: UserState = {
  userId: "",
  email: "",
  emailVerified: false,
  firstName: "",
  lastName: "",
  displayName: "",
  bio: "",
  birthdate: new Date(),
  createdAt: new Date(),
  includingRange: 0,
  interests: 0,
  latitude: "",
  longitude: "",
  radiusInKm: 0,
  sex: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
