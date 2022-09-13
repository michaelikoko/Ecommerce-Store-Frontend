import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import client from "../authentication/client"

export const getSingleProduct = createAsyncThunk("products/getSingleProduct", async function (id, thunkAPI) {
    try 
    {
        const response = await client.get("single_product/"+String(id))
        return response.data
    }
    catch (error)
    {
        console.log(error)
        return thunkAPI.rejectWithValue('something went wrong');
    }
})

const initialState = {
    product: {},
    isLoading : true,
    loadingFailed : false
}

export const singleProductSlice = createSlice({
    name: "singleProduct",
    initialState,
    extraReducers: {
        [getSingleProduct.pending]: function(state, action) {
            state.isLoading = true
        },

        [getSingleProduct.fulfilled]: function(state, action) {
            state.product = action.payload
            state.isLoading = false
        },

        [getSingleProduct.rejected]: function(state, action) {
            state.isLoading = false
            state.loadingFailed = true
        }
    }
})

export default singleProductSlice.reducer