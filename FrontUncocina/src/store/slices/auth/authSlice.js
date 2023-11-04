import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postService } from "../../../services/apiService";
import { ENDPOINT_AUTH } from "../../../services/routes";
const initialState = {
  user_email: "manulatorre@gmail.com",
  user_name: "ManuelL",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzEyODU5OTl9.qhZSht5vf8RTHtSpA8g3gNZOz4pVPly-CLgw29AJRQs",
  loading: false,
  error: false,
  errorMsg: "",
  success:false
}

export const registerUser = createAsyncThunk('auth/register', async(userData, thunkAPI) => {
  try{
    const response = await postService(`${ENDPOINT_AUTH}/register`, userData)
    return response.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const loginUser = createAsyncThunk('auth/login', async(userData, thunkAPI) => {
  try{
    const response = await postService(`${ENDPOINT_AUTH}/login`, userData)
    return response.data
  }catch(err){
    return thunkAPI.rejectWithValue(err.response.data)
  }
  
})



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fullReset:(state)=>{
        state.user_email= ""
        state.user_name= ""
        state.token= ""
        state.loading= false
        state.error= false
        state. errorMsg= ""
        state.success=false
      
    },
    resetAuth: (state) => {
        state.loading= false
        state.error= false
        state. errorMsg= ""
        state.success=false
    },
    resetUser: (state) => {
      state.user_email= ""
      state.user_name= ""
      state.token= ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, {payload}) => {
        if (state.loading) state.loading = false   
        state.errorMsg="" 
        state.error=false
        state.user_email = payload.user_email
        state.user_name = payload.user_name
        state.token = payload.token
        state.success=true
      })
      .addCase(registerUser.pending, (state, action) => {
        if (!state.loading) state.loading = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (state.loading) state.loading = false   
        state.errorMsg = action.error.message
        state.error=true 
      })
      .addCase(loginUser.fulfilled, (state, {payload}) => {
        if (state.loading) state.loading = false  
        state.errorMsg="" 
        state.error=false
        state.user_email = payload.user_email
        state.user_name = payload.user_name
        state.token = payload.token
        state.success = true
      })
      .addCase(loginUser.pending, (state, action) => {
        if (!state.loading) state.loading = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (state.loading) state.loading = false  
        state.errorMsg = action.payload.error
        state.error=true 
        
    
      })
      
  }
})


export const { fullReset, resetAuth, resetUser } = authSlice.actions
export default authSlice.reducer