import { createSlice } from '@reduxjs/toolkit';



const initialState = {

  token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,

}

 const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : {
    setToken(state , value){

      state.token = value.payload;

    },
    logout(state) {
      state.token = null; // Clears token
      localStorage.removeItem("token");
    },
  },

})


export const {setToken , logout} = authSlice.actions;
export default authSlice.reducer;