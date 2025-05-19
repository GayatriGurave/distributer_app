import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems: [],
    cartTotalAmount: 0,
    cartItemCount: 0
}
let CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, actions) => {


            let newItem = { ...actions.payload, qty: 1 }
            
            let existItem = state.cartItems.find(item=>item._id == newItem._id)
            if(! existItem){
                state.cartItems = [...state.cartItems, newItem]
                state.cartItemCount = state.cartItems.length
            } 
            else{
                alert("Aready Added")
            }
           
        },
        incrementQty : (state,actions)=>{
             let prod = state.cartItems.find((item)=>item._id == actions.payload.pId)
             prod.qty +=1
        },
        decrementQty: (state, actions) => {
            let prod = state.cartItems.find((item) => item._id == actions.payload.pId)
            prod.qty -= 1
            if(prod.qty<0){
                state.cartItems = state.cartItems.filter((item)=>item._id != actions.payload.pId)
            }
        },
        removeItem: (state,actions) => {
           state.cartItems = state.cartItems.filter((item)=>item._id != actions.payload.pId)
         },
         
        calculateTotal: (state) => {
            let totAmt = 0
            state.cartItems.forEach((item) => {
                totAmt += item.price * item.qty
            })
            state.cartTotalAmount = totAmt
        }

    }
})
export const { addItem,
    incrementQty,
    decrementQty,
    removeItem,
    calculateTotal } = CartSlice.actions

export default CartSlice.reducer