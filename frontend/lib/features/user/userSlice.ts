import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/lib/types";
import { getMe } from "@/hooks/users";
import { getErrorMessage } from "@/lib/api";

/** The signed-in user. `userId === ""` means nothing has been loaded yet. */
export type UserState = User;

export const initialState: UserState = {
  userId: "",
  firstName: "",
  lastName: "",
  displayName: "",
  email: "",
  emailVerified: false,
  bio: "",
  birthDate: null,
  createdAt: null,
  city: null,
  region: null,
  country: null,
  profession: null,
  latitude: null,
  longitude: null,
  radiusInKm: 100,
  includingRange: 0,
  interests: 0,
  sex: "",
  orientation: [],
  fameRating: 50,
  isOnline: false,
  lastOnline: null,
  userImages: [],
};

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/fetchCurrent",
  async (_, { rejectWithValue }) => {
    try {
      return await getMe();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<UserState>) => action.payload,
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (_state, action) => action.payload);
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const isUserLoaded = (user: UserState) => user.userId !== "";

export default userSlice.reducer;
