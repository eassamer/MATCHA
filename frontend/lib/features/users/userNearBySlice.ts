import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserNearByType {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  birthDate?: Date;
  email: string;
  createdAt: string;
  city: string;
  country: string;
  region: string;
  longitude: number;
  latitude: number;
  radiusInKm: number;
  interests: any;
  sex: string;
  bio: string;
  emailVerified: number;
  fameRating: number;
  userImages: string[];
  distance: number;
}

export interface UsersNearByState {
  usersNearBy: UserNearByType[];
}

const initialState: UsersNearByState = {
  usersNearBy: [
    {
      id: 0,
      userId: "",
      firstName: "",
      lastName: "",
      displayName: "",
      birthDate: undefined,
      email: "",
      createdAt: "",
      longitude: 0,
      city: "",
      country: "",
      region: "",
      latitude: 0,
      radiusInKm: 0,
      interests: [],
      sex: "",
      bio: "",
      emailVerified: 0,
      fameRating: 0,
      userImages: [],
      distance: 0,
    },
  ],
};

export const usersNearBySlice = createSlice({
  name: "usersNearBy",
  initialState,
  reducers: {
    setUsersNearBy: (state, action: PayloadAction<UserNearByType[]>) => {
      state.usersNearBy = action.payload;
    },
  },
});

export const { setUsersNearBy } = usersNearBySlice.actions;

export default usersNearBySlice.reducer;
