import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    loading:false,
}

const profileSlice =createSlice({
    name:"profile",
    initialState: initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload
            localStorage.setItem("user",JSON.stringify(value.payload));
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        removeUser(state ) {
          state.token = null;
          localStorage.removeItem("user");
        },
    }
});

export const {setUser,setLoading , removeUser}=profileSlice.actions;
export default profileSlice.reducer;