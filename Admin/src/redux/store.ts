import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/userSlice";
import modalSlice from "./modal/modalSlice";
import categorySlice from "./category/category.slice";
import companySlice from "./company/company.slice";
import productSlice from "./product/product.slice";
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    category:categorySlice.reducer,
    company:companySlice.reducer,
    product:productSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
