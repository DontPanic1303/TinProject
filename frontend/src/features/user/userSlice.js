import {createSlice} from "@reduxjs/toolkit";
import user from "../../Model/User"

const initialState = {
    user: null,
    isLoggedIn : false,
    isAdmin : false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = JSON.parse(action.payload);
            state.isLoggedIn = true;
            state.isAdmin = state.user.Rodzaj === "Admin";
        },
        deSetUser : (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.isAdmin = false;
        },
    }
});
export const {setUser, deSetUser} = userSlice.actions;
export default userSlice.reducer;