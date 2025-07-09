import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import { toast } from "sonner";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

interface User {
  email: string;
  password: string;
  role: string;
}
interface UserState {
  user: User | null;
  isLoading: boolean;
  signingIn: boolean;
}

const intialState: UserState = {
  user: null,
  isLoading: false,
  signingIn:Cookies.get("token") !== null
      ? JSON.parse(localStorage.getItem("signingIn")!)
      : false,
};

interface userProps {
  email: string;
  password: string;
}
export const signIn = createAsyncThunk(
  "user/signIn",
  async (user: userProps, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", user);
      const data = await res.data;
      return data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message); // ✅ Correct toast usage
          return rejectWithValue(error.response.data.message); // ❗ Important: notify Redux about the error
        }
      }
      toast.error("Failed to login");
      return rejectWithValue("Failed to login"); // ❗ fallback
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.signingIn = true;
      localStorage.setItem("signingIn", JSON.stringify(true));
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
      state.signingIn = false;
    });
  },
});

// export const {} = userSlice.actions;
export default userSlice;
