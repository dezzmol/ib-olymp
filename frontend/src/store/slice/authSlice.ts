import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IAuthSlice {
    isAuth: boolean
}

const initialState: IAuthSlice = {
    isAuth: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            localStorage.setItem("accessToken", action.payload)
            state.isAuth = true
        },
        logout: (state) => {
            localStorage.setItem("accessToken", "")
            state.isAuth = false
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer