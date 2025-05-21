import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userdata: null,
    isLogin: false
}

let UserSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {

        logout: (state) => {
            state.userdata = null
            state.isLogin = false

        },
        login: (state, actions) => {
            state.userdata = actions.payload
            state.isLogin = true
        }
    }
})

export const { logout, login } = UserSlice.actions

export default UserSlice.reducer