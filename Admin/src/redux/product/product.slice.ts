import axiosInstance from "@/helper/axiosInstance";
import type { productformType, productInitialState } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "sonner";

const initialState: productInitialState = {
  Product: [],
  count: 0,
  loading: false,
};

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({page,limit}:{page:number,limit:number}, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/product?page=${page}&limit=${limit}`);
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

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product:productformType, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("stock", product.stock.toString());
      formData.append("tags", JSON.stringify(product.tags));
      formData.append("companyId", product.companyId.toString());
      formData.append("categoryId", product.categoryId.toString());
      for (let i = 0; i < product.images.length; i++) {
        formData.append("images", product.images[i]);
      }
      console.log(formData.entries());
      const res =  axiosInstance.post("/product",formData);
      toast.promise(res, {
        loading: "Adding Product",
        success: "Product Added Successfully",
        error: "Failed to Add Product",
      })
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

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = axiosInstance.delete(`/product/${id}`);
      toast.promise(res, {
        loading: "Deleting Product",
        success: "Product Deleted Successfully",
        error: "Failed to Delete Product",
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
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.Product = action.payload.products;
        state.count = action.payload.havemore;
        state.loading = false;
      })
      .addCase(getProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.Product.push(action.payload.product);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.Product = state.Product.filter((product) => product.id !== action.payload.product.id);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default productSlice;