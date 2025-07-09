import axiosInstance from "@/helper/axiosInstance";
import type { categoryformType, categroyInitialState } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "sonner";

const intialState: categroyInitialState = {
  Category: [],
  loading: false,
};

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (__, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/category/");
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

export const addCategory = createAsyncThunk("category/addCategory",async (category:categoryformType, { rejectWithValue }) => {
    try {
      const res = axiosInstance.post("/category/", category);
    
      toast.promise(
          res,
          {
              loading: "Adding Category",
              success: "Category Added Successfully",
              error: "Failed to Add Category",
          }
      )
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

interface editCategoryProps{
    id:number,
    name:string
}

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (category: editCategoryProps, { rejectWithValue }) => {
    try {
      const res = axiosInstance.put(`/category/${category.id}`, {name:category.name});
      console.log("aaaaaaaaaa",res);
      toast.promise( 
          res,
          {
              loading: "Updating Category",
              success: "Category Updated Successfully",
              error: "Failed to Update Category",
          }
      )
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

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = axiosInstance.delete(`/category/${id}`);
      toast.promise( 
          res,
          {
              loading: "Deleting Category",
              success: "Category Deleted Successfully",
              error: "Failed to Delete Category",
          }
      )
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

const categorySlice = createSlice({
  name: "categroy",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    // get category
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.Category = action.payload.categories;
    });
    builder.addCase(getCategory.rejected, (state) => {
      state.loading = false;
    });
    // add category
    builder.addCase(addCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.Category.push(action.payload.category);
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.loading = false;
    });

    // edit category
    builder.addCase(editCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.Category = state.Category.map((category) => {
        if (category.id === action.payload.category.id) {
          return action.payload.category;
        }
        return category;
      });
    });
    builder.addCase(editCategory.rejected, (state) => {
      state.loading = false;
    });

    // delete category
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.Category = state.Category.filter(
        (category) => category.id !== action.payload.category.id
      );
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default categorySlice;
