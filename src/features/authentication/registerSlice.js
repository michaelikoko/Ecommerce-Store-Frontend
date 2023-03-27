import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'

const url = `${process.env.REACT_APP_API_URL}/api/register/`
export const register = createAsyncThunk("authentication/register", async function(_, thunkAPI) {
    const { email, fullname, password }  = thunkAPI.getState().register
    console.log(email, fullname, password)
   try 
    {
        const response = await axios.post(url, {
            email: email,
            fullname: fullname,
            password: password
        })
        console.log("response", response)
        return response.data
    }
    catch (error)
    {
        console.log("error", error)
        if (error.response.status === 400) return thunkAPI.rejectWithValue('A user with this email already exists');
        return thunkAPI.rejectWithValue('An Error occurred');
    }
})

const initialState = {
    email: "",
    fullname: "",
    password: "",
    confirm_password: "",
    errorModalShow: false,
    formErrorMessage: "An Error occurred",
    successModalShow: false,
    submitLoading: false,
}

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        handleChange: function(state, action){
            const { name, value } = action.payload
            state[name] = value
        },

        hideErrorModal: function(state, action){
            state.errorModalShow = false
        }, 

        hideSuccessModal: function(state, action){
            state.successModalShow = false
        },

        notMatchingPassword: function(state, action){
            state.formErrorMessage = "Passwords do not match."
            state.errorModalShow = true
        },
    },
    extraReducers: {
        [register.pending]: function(state, action){
            state.submitLoading = true
        },

        [register.rejected]: function(state, action){
            state.formErrorMessage = action.payload            
            state.submitLoading = false
            state.errorModalShow = true
        }, 

        [register.fulfilled]: function(state, action){
            state.fullname = ""
            state.email = ""
            state.password = ""
            state.confirm_password = ""
            state.submitLoading = false
            state.successModalShow = true
        }
    }
})

export const { handleChange, hideErrorModal, hideSuccessModal, notMatchingPassword} = registerSlice.actions
export default registerSlice.reducer