import { createSlice } from "@reduxjs/toolkit";
//init set State Redux
const initialState = {
    value: false
}
//slice redux
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
           state.value = action.payload;
        }
    }
});

export const {setAuth} = authSlice.actions;

export default authSlice.reducer;