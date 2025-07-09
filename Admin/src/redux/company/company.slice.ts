import axiosInstance from "@/helper/axiosInstance";
import type {  companyformType, companyInitialState } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "sonner";

const intialState: companyInitialState = {
  Company: [],
  loading: false,
};

export const getCompany = createAsyncThunk(
  "category/getCompany",
  async (__, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/company");
      const data = await res.data;
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message); // ✅ Correct toast usage
          return rejectWithValue(error.response.data.message); // ❗ Important: notify Redux about the error
        }
      }
      toast.error("Failed to get Data");
      return rejectWithValue("Failed to get Data");
    }
  }
);

export const addCompany = createAsyncThunk(
  "company/addCompany",
  async (company: companyformType, { rejectWithValue }) => {
    try {
      const res = axiosInstance.post("/company/", company);
      toast.promise(res, {
        loading: "Adding Company",
        success: "Company Added Successfully",
        error: "Failed to Add Company",
      });
      return (await res).data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message); // ✅ Correct toast usage
          return rejectWithValue(error.response.data.message); // ❗ Important: notify Redux about the error
        }
      }
      toast.error("Failed to add Data");
      return rejectWithValue("Failed to add Data");
    }
  }
);

interface editCompanyProps{
    id:number,
    name:string
}

export const editCompany = createAsyncThunk(
  "company/editCompany",
  async (company: editCompanyProps, { rejectWithValue }) => {
    try {
      const res = axiosInstance.put(`/company/${company.id}`, {
        name: company.name,
      });
      console.log("aaaaaaaaaa", res);
      toast.promise(res, {
        loading: "Updating company",
        success: "company Updated Successfully",
        error: "Failed to Update company",
      });
      return (await res).data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message); // ✅ Correct toast usage
          return rejectWithValue(error.response.data.message); // ❗ Important: notify Redux about the error
        }
      }
      toast.error("Failed to get Data");
      return rejectWithValue("Failed to get Data");
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = axiosInstance.delete(`/company/${id}`);
      toast.promise(res, {
        loading: "Deleting company",
        success: "Company Deleted Successfully",
        error: "Failed to Delete Company",
      });
      return (await res).data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          toast.error(error.response.data.message); // ✅ Correct toast usage
          return rejectWithValue(error.response.data.message); // ❗ Important: notify Redux about the error
        }
      }
      toast.error("Failed to delete Data");
      return rejectWithValue("Failed to delete Data");
  }}
);

const companySlice = createSlice({
  name: "company",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    // get category
    builder.addCase(getCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.Company = action.payload.companys;
    });
    builder.addCase(getCompany.rejected, (state) => {
      state.loading = false;
    });
    // add category
    builder.addCase(addCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.Company.push(action.payload.company);
    });
    builder.addCase(addCompany.rejected, (state) => {
      state.loading = false;
    });

    // edit category
    builder.addCase(editCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.Company = state.Company.map((company) => {
        if (company.id === action.payload.company.id) {
          return action.payload.company;
        }
        return company;
      });
    });
    builder.addCase(editCompany.rejected, (state) => {
      state.loading = false;
    });

    // delete category
    builder.addCase(deleteCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCompany.fulfilled, (state, action) => {
      state.loading = false;
      state.Company = state.Company.filter(
        (company) => company.id !== action.payload.company.id
      );
    });
    builder.addCase(deleteCompany.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default companySlice;
