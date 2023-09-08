import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,//intial state of user is null
        token: null//initial state of token is null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.user = null,//clear user
                state.token = null//clear user token
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;