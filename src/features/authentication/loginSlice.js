import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import client from "./client"

const url = `${process.env.REACT_APP_API_URL}/api/token/obtain/`

export const login = createAsyncThunk("authentication/login", async function(_, thunkAPI){
    const { email, password } = thunkAPI.getState().login
    try 
    {
        const response = await axios.post(url, {
            email: email,
            password: password
        })
        console.log("response", response)
        return response.data
    }
    catch (error)
    {
        console.log("error", error)
        return thunkAPI.rejectWithValue('An Error occurred');
    }    
})

const initialState = {
    email: "",
    password: "",
    submitLoading: false,
    errorModalShow: false,
    user: JSON.parse(localStorage.getItem("user")) || null
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        handleChange: function(state, action) {
            const { name, value } = action.payload
            state[name] = value
        },

        hideErrorModal: function(state, action){
            state.errorModalShow = false
        },

        logout: function(state, action){
            localStorage.removeItem("tokens")
            localStorage.removeItem("user")
            state.user = null
        }
    },
    extraReducers: {
        [login.pending]: function(state, action){
            state.submitLoading = true
        },

        [login.fulfilled]: function(state, action){
            console.log(action, "login successful")
            const tokens = {
                "accessToken": action.payload.access,
                "refreshToken": action.payload.refresh,
            }
            localStorage.setItem("tokens", JSON.stringify(tokens))
            const user = {
                "fullname": action.payload.fullname,
                "email": action.payload.email
            }
            localStorage.setItem("user", JSON.stringify(user))
            client.defaults.headers["Authorization"] = "Bearer " + action.payload.access
            state.user = user
            state.email = ""
            state.password = ""
            state.submitLoading = false
        },

        [login.rejected]: function(state, action){
            state.submitLoading = false
            state.errorModalShow = true
        },
    }
})

export const { handleChange, hideErrorModal, logout } = loginSlice.actions
export default loginSlice.reducer