import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { NearbyUser } from "@/lib/types";
import { getNearbyUsers } from "@/hooks/relations";
import { getErrorMessage } from "@/lib/api";

export type UserNearByType = NearbyUser;

export type LoadStatus = "idle" | "loading" | "ready" | "error";

export interface UsersNearByState {
  items: NearbyUser[];
  status: LoadStatus;
  error: string | null;
}

const initialState: UsersNearByState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchNearbyUsers = createAsyncThunk<NearbyUser[], void, { rejectValue: string }>(
  "usersNearBy/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await getNearbyUsers();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const usersNearBySlice = createSlice({
  name: "usersNearBy",
  initialState,
  reducers: {
    setUsersNearBy: (state, action: PayloadAction<NearbyUser[]>) => {
      state.items = action.payload;
      state.status = "ready";
      state.error = null;
    },
    removeUserNearBy: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((user) => user.userId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNearbyUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "ready";
        state.error = null;
      })
      .addCase(fetchNearbyUsers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload ?? action.error.message ?? "Could not load profiles";
      });
  },
});

export const { setUsersNearBy, removeUserNearBy } = usersNearBySlice.actions;

export default usersNearBySlice.reducer;
