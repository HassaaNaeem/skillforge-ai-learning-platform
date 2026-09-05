import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/api";
import type { User } from "../../types/auth";

export interface AuthState {
    user: User | null,
    status: "idle" | "loading" | "success" | "error",
    error: string | null 
}
const initialState: AuthState = {
    user: null,
    status: "idle",
    error: null,
}


export const fetchMe = createAsyncThunk(
    'auth/me',
    async () => {
      const response = await api.get(`/auth/me`)
      console.log(response.data.user)
      return response.data.user
    },
  )

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string, password: string }) => {
      const response = await api.post(`/auth/login`, credentials)
      return response.data.user
    },
  )

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await api.post(`/auth/logout`)
        return null
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMe.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchMe.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = "success"
        })
        builder.addCase(fetchMe.rejected, (state) => {
            state.user = null
            state.error = null
            state.status = "idle"
        })
        builder.addCase(login.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = "success"
        })
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message ?? null
            state.status = "error"
        })
        builder.addCase(logout.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.user = null
            state.status = "success"
        })
        builder.addCase(logout.rejected, (state, action) => {
            state.user = null
            state.error = action.error.message ?? null
            state.status = "error"
        })
    }
})


// export const  = authSlice.actions
export default authSlice.reducer