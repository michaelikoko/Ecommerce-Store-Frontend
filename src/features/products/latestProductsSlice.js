import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = `${process.env.REACT_APP_API_URL}/api/latest_products/`

export const getLatestProducts = createAsyncThunk("products/getLatestProduct", async function (_, thunkAPI) {
    try 
    {
        const response = await axios.get(url)
        return response.data
    }
    catch (error)
    {
        console.log(error)
        return thunkAPI.rejectWithValue('something went wrong');
    }
})

const initialState = {
    latestProducts: [], 
    isLoading: true,
    loadingFailed: false
}

const latestProductsSlice = createSlice({
    name: "latestProducts",
    initialState,
    extraReducers: {
        [getLatestProducts.pending]: function(state, action) {
            state.isLoading = true
        },

        [getLatestProducts.fulfilled]: function(state, action) {
            state.latestProducts = action.payload
            state.isLoading = false
        },

        [getLatestProducts.rejected]: function(state, action) {
            state.isLoading = false
            state.loadingFailed = true
        }
    }
})


export default latestProductsSlice.reducer