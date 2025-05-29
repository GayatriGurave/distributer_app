import { createSlice } from "@reduxjs/toolkit";

// Load initial cart state from localStorage
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
    }
  }
  return {
    cartItems: [],
    cartTotalAmount: 0,
    cartItemCount: 0
  };
};

// Save cart state to localStorage
const saveCartToStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = loadCartFromStorage();

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = { ...action.payload, qty: 1 };
      const existItem = state.cartItems.find(item => item._id === newItem._id);
      if (!existItem) {
        state.cartItems.push(newItem);
        state.cartItemCount = state.cartItems.length;
        saveCartToStorage(state);
      } else {
        alert("Already Added");
      }
    },

    incrementQty: (state, action) => {
      const prod = state.cartItems.find(item => item._id === action.payload.pId);
      if (prod) {
        prod.qty += 1;
        saveCartToStorage(state);
      }
    },

    decrementQty: (state, action) => {
      const prod = state.cartItems.find(item => item._id === action.payload.pId);
      if (prod) {
        prod.qty -= 1;
        if (prod.qty <= 0) {
          state.cartItems = state.cartItems.filter(item => item._id !== action.payload.pId);
        }
        saveCartToStorage(state);
      }
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload.pId);
      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartItemCount = 0;
      localStorage.removeItem("cart");
    },

    calculateTotal: (state) => {
      let totAmt = 0;
      state.cartItems.forEach((item) => {
        totAmt += item.price * item.qty;
      });
      state.cartTotalAmount = totAmt;
      state.cartItemCount = state.cartItems.length;
      saveCartToStorage(state);
    }
  }
});

export const {
  addItem,
  incrementQty,
  decrementQty,
  removeItem,
  calculateTotal,
  clearCart
} = CartSlice.actions;

export default CartSlice.reducer;
