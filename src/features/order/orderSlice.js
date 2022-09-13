import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import client from "../authentication/client"

export const saveOrder = createAsyncThunk("order/save", async function(_, thunkAPI){
    const { cartItems, cartItemsCost } = thunkAPI.getState().cart
    try
    {
        const response = await client.post("orders/", {
          "cart_items": cartItems,
          "cost": cartItemsCost  
        })
        console.log("order saved successfully" ,response)
        return response.data
    }
    catch (error)
    {
        console.log("error when saving order" ,error)
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

export const getOrders = createAsyncThunk("order/get_orders", async function(_, thunkAPI){
    try
    {
        const response = await client.get("orders")
        console.log("Previous Orders gotten successfully", response)
        return response.data
    }
    catch (error)
    {
        console.log("error getting orders", error)
        return thunkAPI.rejectWithValue("Something went wrong")
    }
})

const initialState = {
    orderSuccessModalShow: false,
    orderErrorModalShow: false,
    orders: [],
    isLoading: false,
    loadingFailed: false,
}

const orderSlice = createSlice({
    name: "order", 
    initialState,
    reducers: {
        handleOrderSuccessModalHide: function(state, action){
            state.orderSuccessModalShow = false
        },

        handleOrderSuccessModalShow: function(state, action){
            state.orderSuccessModalShow = true
        },

        handleOrderErrorModalHide: function(state, action){
            state.orderErrorModalShow = false
        },

        handleOrderErrorModalShow: function(state, action){
            state.orderErrorModalShow = true
        }
    },
    extraReducers: {
        [saveOrder.fulfilled]: function(state, action){
            state.orderSuccessModalShow = true
        },

        [saveOrder.pending]: function(state, action){

        },

        [saveOrder.rejected]: function(state, action){
            state.orderErrorModalShow = true
        },

        [getOrders.pending]: function(state, action){
            state.isLoading = true
        },

        [getOrders.fulfilled]: function(state, action){
            state.orders = action.payload
            state.isLoading = false
        },

        [getOrders.rejected]: function(state, action){
            state.isLoading = false
            state.loadingFailed = true
        }
    }
})

export const { handleOrderSuccessModalShow, handleOrderSuccessModalHide, 
    handleOrderErrorModalShow, handleOrderErrorModalHide } = orderSlice.actions

export default orderSlice.reducer