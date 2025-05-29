import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface profileInfoType {
  id: string;
  senderId: string;
  receiverId: string;
  superLike: number;
  userId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  birthDate?: Date;
  email: string;
  createdAt: string;
  longitude: number;
  latitude: number;
  radiusInKm: number;
  interests: any;
  sex: string;
  bio: string;
  emailVerified: number;
  fameRating: number;
  userImages: string[];
}

export interface LikesState {
  profiles: profileInfoType[];
}

const today = new Date();
const initialState: LikesState = {
  profiles: [
    {
      id: "",
      senderId: "",
      receiverId: "",
      superLike: 0,
      userId: "",
      firstName: "",
      lastName: "",
      displayName: "",
      birthDate: undefined,
      email: "",
      createdAt: "",
      longitude: 0,
      latitude: 0,
      radiusInKm: 0,
      interests: [],
      sex: "",
      bio: "",
      emailVerified: 0,
      fameRating: 0,
      userImages: [],
    },
  ],
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, action: PayloadAction<profileInfoType[]>) => {
      state.profiles = action.payload;
    },
    addLike: (state, action: PayloadAction<profileInfoType>) => {
      state.profiles = [...state.profiles, action.payload];
    },
    removeLike: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(
        (like) => like.id !== action.payload
      );
    },
  },
});

export const { setLikes, addLike, removeLike } = likesSlice.actions;

export default likesSlice.reducer;
