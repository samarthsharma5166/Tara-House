import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from "sonner";
const intialState = {
    user: null,
    loading: false,
    error: null,
};
interface userData{
    email:string,
    password:string
}
export const loginAccount = createAsyncThunk("auth/login", async (data: userData) => {
  try {
    const res = axios.post("/api/login", data);
    toast.promise(res, {
      loading: "Wait! login",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed! to login",
    });
    return (await res).data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.clear(); // Clear storage if unauthorized
      toast.error("Session expired. Please log in again.");
    } else {
      toast.error("Failed to login");
    }
    toast.error(error?.response?.data?.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(loginAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      });
  }
});

export default userSlice.reducer;