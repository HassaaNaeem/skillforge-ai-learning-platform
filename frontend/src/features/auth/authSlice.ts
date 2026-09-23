import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../lib/api";
import { getApiErrorMessage } from "../../lib/apiError";
import { uploadAvatar as uploadAvatarRequest } from "../users/api";
import type { User } from "../../types/auth";

export interface AuthState {
    user: User | null,
    status: "idle" | "loading" | "success" | "error",
    error: string | null,
    initialized: boolean,
}
const initialState: AuthState = {
    user: null,
    status: "idle",
    error: null,
    initialized: false,
}


export const fetchMe = createAsyncThunk(
    'auth/me',
    async () => {
      const response = await api.get(`/auth/me`)
      console.log(response.data.user)
      return response.data.user
    },
  )

export const register = createAsyncThunk(
    'auth/register',
    async (input: { name: string; email: string; password: string }) => {
      const response = await api.post(`/auth/register`, input)
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

export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (file: File, { rejectWithValue }) => {
      try {
        return await uploadAvatarRequest(file)
      } catch (error) {
        return rejectWithValue(getApiErrorMessage(error, 'Could not upload photo'))
      }
    },
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
            state.initialized = true
        })
        builder.addCase(fetchMe.rejected, (state) => {
            state.user = null
            state.error = null
            state.status = "idle"
            state.initialized = true
        })
        builder.addCase(register.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = "success"
            state.error = null
        })
        builder.addCase(register.rejected, (state, action) => {
            state.error = action.error.message ?? null
            state.status = "error"
        })
        builder.addCase(login.pending, (state) => {
            state.status = "loading"
            state.error = null
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
        builder.addCase(uploadAvatar.pending, (state) => {
            state.status = "loading"
            state.error = null
        })
        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = "success"
            state.error = null
        })
        builder.addCase(uploadAvatar.rejected, (state, action) => {
            state.error = typeof action.payload === 'string' ? action.payload : 'Could not upload photo'
            state.status = "error"
        })
    }
})


// export const  = authSlice.actions
export default authSlice.reducer