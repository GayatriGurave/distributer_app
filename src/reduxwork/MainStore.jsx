import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './CartSlice'

let MainStore = configureStore({
    reducer:{
        cart : cartReducer
    }
})

export default MainStore