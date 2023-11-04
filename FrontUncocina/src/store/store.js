import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth/authSlice'
import navBarSlice from "./slices/navBar/navBar";
import recipesSlice from "./slices/recipes/recipesSlice";
import categoriesSlice from "./slices/categories/categories";
export const store = configureStore({
  reducer:{
    auth: authReducer,
    navBar: navBarSlice,
    recipes: recipesSlice,
    categories: categoriesSlice
  },
})