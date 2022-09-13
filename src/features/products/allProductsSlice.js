import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = `${process.env.REACT_APP_API_URL}/api/all_products/`

const initialState = {
    allProducts: [],
    displayedProducts: [],
    isLoading: true,
    loadingFailed: false,
    currentPage: 1,
    productsPerPage: 9,
    categories: [],
    selectedCategory: "All",
    searchQuery: "",
    filter: ""
}

export const getAllProducts = createAsyncThunk("products/getAllProducts", async function( _, thunkAPI) {
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

export const searchProducts = createAsyncThunk("products/searchProducts", async function(_, thunkAPI) {
    const { searchQuery } = thunkAPI.getState().allProducts
    try
    {
        const response = await axios.get(`${url}?search=${searchQuery}`)
        return response.data
    }
    catch (error)
    {
        console.log(error)
        return thunkAPI.rejectWithValue("something went wrong")
    }
})

const allProducts = createSlice({
    name: "allProducts",
    initialState,

    reducers: {
        setCurrentPage: function(state, action) {
            state.currentPage = action.payload
        },

        setSelectedCategory: function(state, action) {
            state.selectedCategory = action.payload
        },

        setDisplayedProducts: function(state, action){
            state.filter = ""
            state.searchQuery = ""
            state.currentPage = 1
            if (state.selectedCategory === "") return
            if (action.payload === "All") 
            {
                state.displayedProducts = state.allProducts.filter( prod => true)
                return 
            }
            state.displayedProducts = state.allProducts.filter( prod => prod.category === action.payload)
        },

        sortNameAscending: function(state, action) {
            state.filter = "Name (A-Z)"
            state.displayedProducts = state.displayedProducts.sort( function (a, b) {
                const nameA = a.name.toLowerCase()
                const nameB = b.name.toLowerCase()
                if (nameA < nameB) return -1
                if (nameA > nameB) return 1
                return 0
            })
        },

        sortNameDescending: function(state, action) {
            state.filter = "Name (Z-A)"
            state.displayedProducts = state.displayedProducts.sort( function (a, b) {
                const nameA = a.name.toLowerCase()
                const nameB = b.name.toLowerCase()
                if (nameA < nameB) return 1
                if (nameA > nameB) return -1
                return 0
            })            
        },

        sortPriceLowest: function(state, action) {
            state.filter = "Price (Lowest)"
            state.displayedProducts = state.displayedProducts.sort( function (a, b) {
                const priceA = a.price
                const priceB = b.price
                if (priceA < priceB) return -1
                if (priceA > priceB) return 1
                return 0
            })            
        },

        sortPriceHighest: function(state, action) {
            state.filter = "Price (Highest)"
            state.displayedProducts = state.displayedProducts.sort( function (a, b) {
                const priceA = a.price
                const priceB = b.price
                if (priceA < priceB) return 1
                if (priceA > priceB) return -1
                return 0
            })            
        },

        handleSearchChange: function(state, action){
            state.searchQuery = action.payload
        }
    },

    extraReducers: {
        [getAllProducts.pending]: function(state, action) {
            state.isLoading = true
        },

        [getAllProducts.fulfilled]: function(state, action) {
            state.allProducts = action.payload
            state.displayedProducts = action.payload
            state.isLoading = false
            const categories = new Set()
            state.allProducts.map(prod => categories.add(prod.category))
            state.categories = [...Array.from(categories)]
        },

        [getAllProducts.rejected]: function(state, action) {
            state.isLoading = false
            state.loadingFailed = true
        },

        [searchProducts.pending]: function(state, action) {

        },

        [searchProducts.fulfilled]:  function(state, action){
            state.displayedProducts = action.payload
            state.currentPage = 1
            state.selectedCategory = ""
        },

        [searchProducts.rejected]: function(state, action) {
            console.log("error", action.payload)
        }

    }
})

export const { setCurrentPage, setSelectedCategory, 
    setDisplayedProducts, sortNameAscending, 
    sortNameDescending, sortPriceLowest, sortPriceHighest, handleSearchChange
} = allProducts.actions

export default allProducts.reducer