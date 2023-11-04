import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBodyService, getQueryService, postService } from "../../../services/apiService";

import { ENDPOINT_FAV, ENDPOINT_RECIPE } from "../../../services/routes";
const initialState = {
  recipes:[],
  recipeSelected:"",
  loading: false,
  error: false,
  errorMsg: "",
  success:false,
  isEndList:false
}

export const getAllRecipes = createAsyncThunk('recipes/getAllRecipes', async(reqData, thunkAPI) => {
  try{
    const response = await getQueryService(`${ENDPOINT_RECIPE}`, reqData)  
    return response.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const getFavRecipes = createAsyncThunk('recipes/getFavRecipes', async(reqData, thunkAPI) => {
  try{
    const {user_email, user_name, token}=thunkAPI.getState().auth
    const data= {...reqData, user_email:user_email, user_name:user_name}
  

    const response = await getQueryService(`${ENDPOINT_FAV}`, data,token)  
    return response.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    fullReset:(state)=>{
        state.recipes=[]
        state.recipeSelected=""
        state.loading= false
        state.error= false
        state.errorMsg= ""
        state.success=false
        state.isEndList=false
      
    },
    resetRecipeReq: (state) => {
        state.loading= false
        state.error= false
        state.errorMsg= ""
        state.success=false
        state.isEndList=false
    },
    resetRecipes: (state) => {
      state.recipes=[]
      state.recipeSelected=""
    },
    resetIsEndList:(state)=>{
      state.isEndList=false;
    },
    setSelected:(state,{payload})=>{
      state.recipeSelected=payload
    },
    updateRecipeAvgCalif: (state, { payload }) => {
      const newRecipes = [...state.recipes];
      newRecipes[payload.index]={...newRecipes[payload.index], avgCalif: payload.resp.avgCalif}
      return { ...state, recipes: newRecipes };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.fulfilled, (state, {payload}) => {
        if (state.loading) state.loading = false   
        state.errorMsg="" 
        state.error=false
        if(payload.length>0){
          state.recipes= state.recipes.concat(payload)
        }else{
          state.isEndList=true;
        }
        state.success=true
      })
      .addCase(getAllRecipes.pending, (state, action) => {
        if (!state.loading) state.loading = true
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        if (state.loading) state.loading = false   
        state.errorMsg = action.error.message
        state.error=true 
      })
      .addCase(getFavRecipes.fulfilled, (state, {payload}) => {
        if (state.loading) state.loading = false   
        state.errorMsg="" 
        state.error=false
        if(payload.length>0){
          state.recipes= state.recipes.concat(payload)
        }else{
          state.isEndList=true;
        }
        state.success=true
      })
      .addCase(getFavRecipes.pending, (state, action) => {
        if (!state.loading) state.loading = true
      })
      .addCase(getFavRecipes.rejected, (state, action) => {
        if (state.loading) state.loading = false   
        state.errorMsg = action.error.message
        state.error=true 
      })      
  }
})


export const { 
  fullReset, 
  resetRecipeReq, 
  resetRecipes,
  resetIsEndList,
  setSelected,
  updateRecipeAvgCalif  } = recipesSlice.actions
export default recipesSlice.reducer