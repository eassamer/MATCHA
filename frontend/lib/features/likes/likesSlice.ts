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
  birthDate: Date;
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
      birthDate: new Date(),
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
  },
});

export const { setLikes } = likesSlice.actions;

export default likesSlice.reducer;
