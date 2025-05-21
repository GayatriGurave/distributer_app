import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice'
import userReducer from './UserSlice'
let MainStore = configureStore({
    reducer:{
        cart : cartReducer,
        userInfo : userReducer

    }
})

export default MainStore