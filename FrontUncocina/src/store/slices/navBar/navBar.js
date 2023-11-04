import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  selectedButton: 1,
}

export const navBarSlice = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    reset:(state)=>{
      state.show= false,
      state.selectedButton= 1
    },
    setPressedButton:(state, {payload})=>{
      state.selectedButton = payload      
    },
    setIsShow: (state, {payload}) => {
        state.show = payload
    },

  }})

export const {reset,setPressedButton, setIsShow} = navBarSlice.actions
export default navBarSlice.reducer