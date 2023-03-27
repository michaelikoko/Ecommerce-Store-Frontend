import { configureStore } from "@reduxjs/toolkit"
import latestProductsReducer from "./features/products/latestProductsSlice"
import allProductsReducer from "./features/products/allProductsSlice"
import singleProductReducer from "./features/products/singleProductSlice"
import cartReducer from "./features/cart/cartSlice"
import registerReducer from "./features/authentication/registerSlice"
import loginReducer from "./features/authentication/loginSlice"
import orderReducer from "./features/order/orderSlice"

export const store = configureStore({
    reducer: {
        latestProducts: latestProductsReducer,
        allProducts: allProductsReducer,
        singleProduct: singleProductReducer,
        cart: cartReducer,
        register: registerReducer,
        login: loginReducer, 
        order: orderReducer
    },
})