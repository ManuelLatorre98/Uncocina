import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQueryService } from "../../../services/apiService";
import { ENDPOINT_CATEGORY } from "../../../services/routes";


const initialState = {
  categories:[],
  loading: false,
  error: false,
  errorMsg: "",
  success:false
}

export const getAllCategories = createAsyncThunk('recipes/getAllCategories', async(reqData, thunkAPI) => {
  try{
    const response = await getQueryService(`${ENDPOINT_CATEGORY}`, reqData)
    return response.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data)
  }
})




export const categoriesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    fullResetCategories:(state)=>{
        state.categories=[]
        state.loading= false
        state.error= false
        state.errorMsg= ""
        state.success=false
      
    },
    resetCategoriesReq: (state) => {
        state.loading= false
        state.error= false
        state.errorMsg= ""
        state.success=false
    },
    resetCategories: (state) => {
      state.recipes=[]
      state.recipeSelected=""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, {payload}) => {
        if (state.loading) state.loading = false   
        state.errorMsg="" 
        state.error=false
        state.categories= payload
        
        state.success=true
      })
      .addCase(getAllCategories.pending, (state, action) => {
        if (!state.loading) state.loading = true
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        if (state.loading) state.loading = false   
        state.errorMsg = action.error.message
        state.error=true 
      })      
  }
})


export const { fullReset, resetCategoriesReq, resetCategories  } = categoriesSlice.actions
export default categoriesSlice.reducer