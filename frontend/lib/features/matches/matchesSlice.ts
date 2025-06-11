import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface matcheInfoType {
  id: string;
  user1Id: string;
  user2Id: string;
  createdAt: string;
  user1: {
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
  };
  user2: {
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
  };
}

export interface MatchesState {
  matches: matcheInfoType[];
}

const initialState: MatchesState = {
  matches: [],
};

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    setMatches: (state, action: PayloadAction<matcheInfoType[]>) => {
      state.matches = action.payload;
    },
    addMatch: (state, action: PayloadAction<matcheInfoType>) => {
      state.matches.push(action.payload);
    },
    removeMatch: (state, action: PayloadAction<string>) => {
      state.matches = state.matches.filter(
        (match) => match.id !== action.payload
      );
    },
  },
});

export const { setMatches } = matchesSlice.actions;
export default matchesSlice.reducer;
