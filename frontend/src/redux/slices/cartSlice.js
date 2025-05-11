import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import  {toast } from "react-hot-toast"

const initialState = {

    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0

}

 const cartSlice = createSlice({
  name : "cart",
  initialState,
  reducers : {
    setTotalItems(state , value){

      state.user = value.payload;

    },

    // HM
    // add to cart fun
    // remove from cart
    // reset cart
  },

})


export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;