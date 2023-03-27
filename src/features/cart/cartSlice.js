import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    cartItemsCount: 0,
    cartItemsCost: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: function(state, action) {
            if (state.cartItems.some( item => item.id === action.payload.id )) return

            state.cartItems.push(
                {
                    ...action.payload,
                    itemCount: 1
                }
            )
        },

        increaseItemCount: function(state, action) {
            const cartItem = state.cartItems.find( item => item.id === action.payload)
            cartItem.itemCount = cartItem.itemCount + 1
        },

        decreaseItemCount: function(state, action) {
            const cartItem = state.cartItems.find( item => item.id === action.payload)
            if (cartItem.itemCount === 1) return
            cartItem.itemCount = cartItem.itemCount - 1
        },

        removeItem: function(state, action) {
            state.cartItems = state.cartItems.filter( item => item.id !== action.payload)
        },

        clearCart: function(state, action) {
            state.cartItems = []
        },

        calculateTotal: function(state, action) {
            let cartCount = 0
            let cartCost = 0

            state.cartItems.forEach( item => {
                cartCount += item.itemCount
                cartCost += item.itemCount * item.price
            })

            state.cartItemsCount = cartCount
            state.cartItemsCost = cartCost
        }
    }
})

export const { addItem, increaseItemCount, decreaseItemCount, removeItem, clearCart, calculateTotal } = cartSlice.actions
export default cartSlice.reducer