import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../interfaces/User";

interface RootState {
  loading: boolean;
  userInfo: User | null;
  authError: boolean;
}

const initialState: RootState = {
  loading: true,
  userInfo: null,
  authError: false,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<User | null>) => {
      state.userInfo = action.payload;
    },
    setAuthError: (state, action: PayloadAction<boolean>) => {
      state.authError = action.payload;
    },
  },
});

export const { setLoading, setUserInfo, setAuthError } = rootSlice.actions;
export default rootSlice.reducer;
